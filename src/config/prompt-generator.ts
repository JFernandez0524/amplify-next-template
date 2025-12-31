import { getNicheConfig, type QualificationQuestion } from './niche-config';
import fs from 'fs';
import path from 'path';

export function generateVapiPrompt(nicheId?: string): string {
  // Use provided niche ID or fall back to environment variable
  const originalNicheId = process.env.NEXT_PUBLIC_NICHE_ID;
  if (nicheId) {
    process.env.NEXT_PUBLIC_NICHE_ID = nicheId;
  }
  
  const config = getNicheConfig();
  
  // Restore original niche ID
  if (originalNicheId) {
    process.env.NEXT_PUBLIC_NICHE_ID = originalNicheId;
  }
  
  // Read the master prompt template
  const templatePath = path.join(process.cwd(), 'src/prompts/vapi-master-prompt.md');
  let template = fs.readFileSync(templatePath, 'utf-8');
  
  // Replace placeholders with niche-specific content
  template = template.replace(/{{BUSINESS_NAME}}/g, config.business.name);
  template = template.replace(/{{SERVICE_TYPE}}/g, config.business.serviceType);
  template = template.replace(/{{QUALIFYING_QUESTIONS}}/g, formatQualifyingQuestions(config.qualification.questions));
  template = template.replace(/{{HIGH_INTENT_SIGNALS}}/g, config.qualification.highIntentSignals.map(signal => `- "${signal}"`).join('\n'));
  template = template.replace(/{{DISQUALIFIERS}}/g, config.qualification.disqualifiers.map(signal => `- "${signal}"`).join('\n'));
  template = template.replace(/{{SERVICE_SPECIFIC_INFO}}/g, getServiceSpecificInfo(config.business.serviceType));
  template = template.replace(/{{SERVICE_CONTEXT}}/g, getServiceContext(config.business.serviceType));
  
  return template;
}

function formatQualifyingQuestions(questions: QualificationQuestion[]): string {
  return questions.map((q, index) => {
    let formatted = `${index + 1}. **${q.question}**\n`;
    formatted += `   - Type: ${q.type}\n`;
    if (q.options) {
      formatted += `   - Options: ${q.options.join(', ')}\n`;
    }
    formatted += `   - Required: ${q.required ? 'Yes' : 'No'}\n`;
    formatted += `   - Qualification Weight: ${q.weight}/4\n`;
    return formatted;
  }).join('\n');
}

function getServiceSpecificInfo(serviceType: string): string {
  if (serviceType.toLowerCase().includes('junk')) {
    return `- Estimated truck loads needed
- Type of items to be removed
- Property access (stairs, narrow hallways, etc.)
- Preferred removal date
- Any hazardous materials`;
  }
  
  if (serviceType.toLowerCase().includes('cleaning')) {
    return `- Number of bedrooms and bathrooms
- Square footage (approximate)
- Cleaning frequency preference
- Special requests or problem areas
- Pet-friendly cleaning needs`;
  }
  
  if (serviceType.toLowerCase().includes('notary')) {
    return `- Type of documents to be notarized
- Number of signers
- Preferred service location
- Required identification available
- Timeline for service`;
  }
  
  return `- Service location details
- Scope of work needed
- Timeline requirements
- Special considerations
- Access requirements`;
}

function getServiceContext(serviceType: string): string {
  if (serviceType.toLowerCase().includes('junk')) {
    return `**Junk Removal Context:**
- We handle furniture, appliances, construction debris, yard waste, and general clutter
- We do NOT handle hazardous materials, chemicals, or medical waste
- Pricing is typically based on truck load volume
- Same-day service often available
- We donate and recycle whenever possible
- All items are removed from wherever they sit - no need for customer to move anything`;
  }
  
  if (serviceType.toLowerCase().includes('cleaning')) {
    return `**House Cleaning Context:**
- We offer one-time deep cleans and recurring maintenance cleaning
- Services include all rooms, bathrooms, kitchen, dusting, vacuuming, mopping
- We bring all supplies and equipment
- Pricing varies by home size and frequency
- We're bonded and insured
- Pet-friendly and eco-friendly options available
- Flexible scheduling including weekends`;
  }
  
  if (serviceType.toLowerCase().includes('notary')) {
    return `**Mobile Notary Context:**
- We notarize all types of documents: real estate, legal, financial, personal
- Mobile service - we come to your location (home, office, hospital, etc.)
- Available 7 days a week including evenings and weekends
- Same-day and emergency services available
- Licensed, bonded, and insured notary public
- All signers must have valid government-issued photo ID
- Pricing based on document type, number of signatures, and travel distance`;
  }
  
  return `**Service Context:**
- Professional, licensed, and insured service
- Free estimates and consultations
- Flexible scheduling options
- Satisfaction guarantee
- Competitive pricing
- Local, trusted company`;
}

// Export function to generate prompts for all niches
export function generateAllVapiPrompts(): Record<string, string> {
  const prompts: Record<string, string> = {};
  
  // Get all available niche IDs from the config
  const niches = ['junk-removal', 'house-cleaning']; // Add more as needed
  
  niches.forEach(nicheId => {
    prompts[nicheId] = generateVapiPrompt(nicheId);
  });
  
  return prompts;
}
