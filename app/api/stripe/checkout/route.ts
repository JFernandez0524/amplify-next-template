import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { generateClient } from 'aws-amplify/data';
import { getNicheConfig } from '@/src/config/niche-config';
import type { Schema } from '@/amplify/data/resource';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
});

const client = generateClient<Schema>();

export async function POST(request: NextRequest) {
  try {
    const { leadId, amount, serviceDetails } = await request.json();
    
    if (!leadId || !amount) {
      return NextResponse.json(
        { error: 'Lead ID and amount are required' },
        { status: 400 }
      );
    }

    // Get lead details
    const { data: lead } = await client.models.Lead.get({ id: leadId });
    if (!lead) {
      return NextResponse.json(
        { error: 'Lead not found' },
        { status: 404 }
      );
    }

    const config = getNicheConfig();
    
    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `${config.business.serviceType} Service`,
              description: serviceDetails?.description || `${config.business.serviceType} for ${lead.firstName}`,
            },
            unit_amount: Math.round(amount * 100), // Convert to cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${request.nextUrl.origin}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.nextUrl.origin}/payment/cancel`,
      metadata: {
        leadId,
        serviceType: config.business.serviceType,
      },
      customer_email: lead.email || undefined,
    });

    // Create payment record
    await client.models.Payment.create({
      leadId,
      amount,
      currency: 'USD',
      status: 'pending',
      paymentMethod: 'stripe',
      transactionId: session.id,
      serviceDetails: serviceDetails || {},
    });

    return NextResponse.json({ 
      sessionId: session.id,
      url: session.url 
    });

  } catch (error) {
    console.error('Stripe checkout error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
