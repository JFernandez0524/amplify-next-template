import { NextRequest, NextResponse } from 'next/server';
import { generateClient } from 'aws-amplify/data';
import { getNicheConfig } from '@/src/config/niche-config';
import type { Schema } from '@/amplify/data/resource';

const client = generateClient<Schema>();

interface VapiWebhookPayload {
  message: {
    type: string;
    call: {
      id: string;
      phoneNumber: string;
      status: string;
      startedAt: string;
      endedAt: string;
      duration: number;
    };
    transcript: string;
    extractedData: {
      firstName?: string;
      lastName?: string;
      email?: string;
      phone?: string;
      isQualified: boolean;
      qualificationScore: number;
      answers: Record<string, any>;
    };
  };
}

interface GHLContact {
  firstName: string;
  lastName?: string;
  email?: string;
  phone?: string;
  tags?: string[];
  customFields?: Record<string, any>;
}

interface GHLOpportunity {
  title: string;
  pipelineId: string;
  stageId: string;
  contactId: string;
  monetaryValue?: number;
  customFields?: Record<string, any>;
}

export async function POST(request: NextRequest) {
  try {
    const payload: VapiWebhookPayload = await request.json();
    const { message } = payload;
    
    // Only process end-of-call reports
    if (message.type !== 'end-of-call-report') {
      return NextResponse.json({ status: 'ignored' });
    }

    const config = getNicheConfig();
    const { call, transcript, extractedData } = message;
    
    // Create call log
    await client.models.CallLog.create({
      vapiCallId: call.id,
      phoneNumber: call.phoneNumber,
      duration: call.duration,
      status: call.status as any,
      transcript,
      extractedData,
      qualificationResult: {
        isQualified: extractedData.isQualified,
        score: extractedData.qualificationScore,
        answers: extractedData.answers
      },
      startedAt: call.startedAt,
      endedAt: call.endedAt,
    });

    // Create lead record
    const leadData = {
      firstName: extractedData.firstName || 'Unknown',
      lastName: extractedData.lastName,
      email: extractedData.email,
      phone: extractedData.phone || call.phoneNumber,
      source: 'phone',
      status: extractedData.isQualified ? 'qualified' : 'new' as any,
      isQualified: extractedData.isQualified,
      qualificationScore: extractedData.qualificationScore,
      serviceType: config.business.serviceType.toLowerCase().replace(' ', '-'),
      metadata: extractedData.answers,
      vapiCallId: call.id,
      callTranscript: transcript,
    };

    const { data: lead } = await client.models.Lead.create(leadData);

    // If qualified, create GHL contact and opportunity
    if (extractedData.isQualified && lead) {
      try {
        // Get business config for API keys
        const { data: businessConfigs } = await client.models.BusinessConfig.list({
          filter: { nicheId: { eq: process.env.NEXT_PUBLIC_NICHE_ID || 'junk-removal' } }
        });
        
        const businessConfig = businessConfigs[0];
        if (!businessConfig?.ghlApiKey) {
          console.error('GHL API key not found in business config');
          return NextResponse.json({ status: 'success', warning: 'GHL integration skipped' });
        }

        // Create GHL contact
        const ghlContact: GHLContact = {
          firstName: extractedData.firstName || 'Unknown',
          lastName: extractedData.lastName,
          email: extractedData.email,
          phone: extractedData.phone || call.phoneNumber,
          tags: config.ghl.tagNames,
          customFields: mapToGHLCustomFields(extractedData.answers, config.ghl.customFields)
        };

        const contactResponse = await createGHLContact(ghlContact, businessConfig.ghlApiKey, businessConfig.ghlSubAccountId);
        
        if (contactResponse.contact?.id) {
          // Update lead with GHL contact ID
          await client.models.Lead.update({
            id: lead.id,
            ghlContactId: contactResponse.contact.id
          });

          // Create GHL opportunity
          const opportunity: GHLOpportunity = {
            title: `${config.business.serviceType} - ${extractedData.firstName || 'Lead'}`,
            pipelineId: config.ghl.pipelineId,
            stageId: config.ghl.stageId,
            contactId: contactResponse.contact.id,
            monetaryValue: calculateEstimatedValue(extractedData.answers, config.business.serviceType),
            customFields: mapToGHLCustomFields(extractedData.answers, config.ghl.customFields)
          };

          const opportunityResponse = await createGHLOpportunity(opportunity, businessConfig.ghlApiKey, businessConfig.ghlSubAccountId);
          
          if (opportunityResponse.opportunity?.id) {
            await client.models.Lead.update({
              id: lead.id,
              ghlOpportunityId: opportunityResponse.opportunity.id
            });

            // Send SMS notification
            await sendGHLSMS(
              contactResponse.contact.id,
              generateSMSMessage(config, extractedData),
              businessConfig.ghlApiKey,
              businessConfig.ghlSubAccountId
            );
          }
        }
      } catch (ghlError) {
        console.error('GHL integration error:', ghlError);
        // Continue processing even if GHL fails
      }
    }

    return NextResponse.json({ 
      status: 'success',
      leadId: lead?.id,
      qualified: extractedData.isQualified 
    });

  } catch (error) {
    console.error('Webhook processing error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Helper functions
function mapToGHLCustomFields(answers: Record<string, any>, fieldMapping: Record<string, string>): Record<string, any> {
  const customFields: Record<string, any> = {};
  
  Object.entries(answers).forEach(([key, value]) => {
    const ghlFieldId = fieldMapping[key];
    if (ghlFieldId) {
      customFields[ghlFieldId] = value;
    }
  });
  
  return customFields;
}

function calculateEstimatedValue(answers: Record<string, any>, serviceType: string): number {
  // Simple estimation logic - can be made more sophisticated
  if (serviceType.includes('junk')) {
    const truckLoads = answers.truck_loads || '1 truck load';
    if (truckLoads.includes('1')) return 300;
    if (truckLoads.includes('2-3')) return 600;
    if (truckLoads.includes('4+')) return 1200;
  }
  
  if (serviceType.includes('cleaning')) {
    const bedrooms = parseInt(answers.bedrooms || '2');
    const frequency = answers.frequency || 'one-time';
    const basePrice = bedrooms * 50;
    
    if (frequency === 'weekly') return basePrice * 4;
    if (frequency === 'bi-weekly') return basePrice * 2;
    if (frequency === 'monthly') return basePrice;
  }
  
  return 250; // Default estimate
}

function generateSMSMessage(config: any, extractedData: any): string {
  return `Hi ${extractedData.firstName}! Thanks for your interest in ${config.business.name}. We'll have a team member contact you within 24 hours to schedule your ${config.business.serviceType.toLowerCase()} service. Reply STOP to opt out.`;
}

// GHL API functions
async function createGHLContact(contact: GHLContact, apiKey: string, subAccountId: string) {
  const response = await fetch(`https://services.leadconnectorhq.com/contacts/`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'Version': '2021-07-28'
    },
    body: JSON.stringify({
      ...contact,
      locationId: subAccountId
    })
  });
  
  return response.json();
}

async function createGHLOpportunity(opportunity: GHLOpportunity, apiKey: string, subAccountId: string) {
  const response = await fetch(`https://services.leadconnectorhq.com/opportunities/`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'Version': '2021-07-28'
    },
    body: JSON.stringify({
      ...opportunity,
      locationId: subAccountId
    })
  });
  
  return response.json();
}

async function sendGHLSMS(contactId: string, message: string, apiKey: string, subAccountId: string) {
  const response = await fetch(`https://services.leadconnectorhq.com/conversations/messages`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'Version': '2021-07-28'
    },
    body: JSON.stringify({
      type: 'SMS',
      contactId,
      message,
      locationId: subAccountId
    })
  });
  
  return response.json();
}
