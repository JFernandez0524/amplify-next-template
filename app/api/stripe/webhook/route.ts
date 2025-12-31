import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '@/amplify/data/resource';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
});

const client = generateClient<Schema>();
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: NextRequest) {
  const body = await request.text();
  const sig = request.headers.get('stripe-signature')!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session);
        break;
      
      case 'payment_intent.succeeded':
        await handlePaymentSucceeded(event.data.object as Stripe.PaymentIntent);
        break;
      
      case 'payment_intent.payment_failed':
        await handlePaymentFailed(event.data.object as Stripe.PaymentIntent);
        break;
      
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook processing error:', error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const leadId = session.metadata?.leadId;
  if (!leadId) return;

  // Update payment record
  const { data: payments } = await client.models.Payment.list({
    filter: { transactionId: { eq: session.id } }
  });

  if (payments.length > 0) {
    await client.models.Payment.update({
      id: payments[0].id,
      status: 'completed',
      paymentDate: new Date().toISOString(),
    });

    // Update lead status
    await client.models.Lead.update({
      id: leadId,
      status: 'converted',
      convertedAt: new Date().toISOString(),
    });

    // Update opportunity if exists
    const { data: opportunities } = await client.models.Opportunity.list({
      filter: { leadId: { eq: leadId } }
    });

    if (opportunities.length > 0) {
      await client.models.Opportunity.update({
        id: opportunities[0].id,
        stage: 'scheduled',
        probability: 100,
      });
    }
  }
}

async function handlePaymentSucceeded(paymentIntent: Stripe.PaymentIntent) {
  // Additional payment success handling if needed
  console.log('Payment succeeded:', paymentIntent.id);
}

async function handlePaymentFailed(paymentIntent: Stripe.PaymentIntent) {
  // Handle failed payments
  console.log('Payment failed:', paymentIntent.id);
  
  // You could update payment records or send notifications here
}
