import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { getKnowledgeBase } from '@/src/lib/ai/knowledge-base';
import { getNicheConfig } from '@/src/config/niche-config';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { message, conversationHistory = [] } = await request.json();
    
    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    const config = getNicheConfig();
    const knowledgeBase = getKnowledgeBase();
    
    // Create system prompt with business context and knowledge
    const systemPrompt = `You are a helpful customer service representative for ${config.business.name}, a ${config.business.serviceType} company. 

BUSINESS INFORMATION:
- Company: ${config.business.name}
- Service: ${config.business.serviceType}
- Tagline: ${config.business.tagline}
- Description: ${config.business.description}

KNOWLEDGE BASE:
${JSON.stringify(knowledgeBase, null, 2)}

INSTRUCTIONS:
1. Be friendly, professional, and helpful
2. Use the knowledge base to answer questions accurately
3. If you don't know something, admit it and offer to connect them with a specialist
4. Always try to guide conversations toward booking or getting a quote
5. Mention our phone number for immediate assistance: ${config.vapi.phoneNumber || 'available on our website'}
6. Keep responses concise but informative
7. Use a conversational, human-like tone
8. If asked about pricing, provide general ranges and encourage them to get a personalized quote

IMPORTANT: Only provide information that's in the knowledge base. Don't make up details about services, pricing, or policies.`;

    // Prepare conversation messages
    const messages = [
      { role: 'system', content: systemPrompt },
      ...conversationHistory.map((msg: any) => ({
        role: msg.role,
        content: msg.content
      })),
      { role: 'user', content: message }
    ];

    // Get AI response
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: messages as any,
      max_tokens: 500,
      temperature: 0.7,
    });

    const aiResponse = completion.choices[0]?.message?.content || 'I apologize, but I encountered an error. Please try again or call us directly for assistance.';

    // Check if the response suggests booking or getting a quote
    const shouldShowCTA = aiResponse.toLowerCase().includes('book') || 
                         aiResponse.toLowerCase().includes('quote') || 
                         aiResponse.toLowerCase().includes('estimate') ||
                         aiResponse.toLowerCase().includes('call');

    return NextResponse.json({
      response: aiResponse,
      showCTA: shouldShowCTA,
      ctaText: shouldShowCTA ? `Call ${config.vapi.phoneNumber || 'us'} to book now!` : null,
    });

  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Failed to process chat message' },
      { status: 500 }
    );
  }
}
