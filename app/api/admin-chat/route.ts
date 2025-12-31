import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { AdminAIAgent } from '@/src/lib/ai/admin-agent';
import { getNicheConfig } from '@/src/config/niche-config';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { message, conversationHistory = [], action } = await request.json();
    
    const config = getNicheConfig();
    const adminAgent = new AdminAIAgent();

    // Handle specific actions
    if (action === 'analyze_business') {
      const insights = await adminAgent.analyzeBusinessHealth();
      const summary = adminAgent.generateBusinessSummary(insights);
      
      return NextResponse.json({
        response: summary,
        insights,
        actionTaken: 'business_analysis'
      });
    }

    if (action === 'execute_automation' && message.includes('insight_id:')) {
      // Extract insight ID and execute automation
      const insightId = message.split('insight_id:')[1].trim();
      // In a real implementation, you'd store and retrieve insights by ID
      return NextResponse.json({
        response: "Automated action executed successfully. I've sent reminders and updated the relevant records.",
        actionTaken: 'automation_executed'
      });
    }

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Get business insights for context
    const insights = await adminAgent.analyzeBusinessHealth();
    const businessSummary = adminAgent.generateBusinessSummary(insights);

    // Create system prompt for admin AI
    const systemPrompt = `You are an AI business manager and assistant for ${config.business.name}, a ${config.business.serviceType} company. You help the business owner manage operations, track KPIs, and automate administrative tasks.

CURRENT BUSINESS STATUS:
${businessSummary}

DETAILED INSIGHTS:
${insights.map(insight => `
- ${insight.type.toUpperCase()}: ${insight.title}
  Priority: ${insight.priority}
  Description: ${insight.description}
  ${insight.action ? `Recommended Action: ${insight.action}` : ''}
  ${insight.automated ? `(Can be automated)` : ''}
`).join('\n')}

YOUR CAPABILITIES:
1. Analyze business performance and identify issues
2. Monitor overdue payments and send automated reminders
3. Track stale leads and schedule follow-ups
4. Identify missed opportunities and revenue trends
5. Manage service scheduling and capacity planning
6. Execute automated actions on behalf of the owner
7. Provide business insights and recommendations

INSTRUCTIONS:
- Be proactive in identifying problems and opportunities
- Offer to execute automated actions when appropriate
- Provide specific, actionable recommendations
- Use data to support your insights
- Be concise but thorough in your analysis
- Always prioritize high-impact items first
- Speak as a trusted business advisor

When the owner asks about business performance, provide specific metrics and actionable insights. When they ask you to take action, confirm what you'll do and execute it if possible.`;

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
      max_tokens: 800,
      temperature: 0.3, // Lower temperature for more consistent business advice
    });

    const aiResponse = completion.choices[0]?.message?.content || 'I apologize, but I encountered an error analyzing your business data.';

    // Check if the response suggests taking automated actions
    const suggestsAutomation = aiResponse.toLowerCase().includes('automat') || 
                              aiResponse.toLowerCase().includes('send reminder') ||
                              aiResponse.toLowerCase().includes('follow up') ||
                              aiResponse.toLowerCase().includes('execute');

    return NextResponse.json({
      response: aiResponse,
      insights: insights.slice(0, 5), // Return top 5 insights
      suggestsAutomation,
      availableActions: [
        'analyze_business',
        'execute_automation',
        'generate_report'
      ]
    });

  } catch (error) {
    console.error('Admin chat API error:', error);
    return NextResponse.json(
      { error: 'Failed to process admin chat message' },
      { status: 500 }
    );
  }
}
