import { cookieBasedClient } from '@/app/lib/amplify-server-utils';
import { getNicheConfig } from '@/src/config/niche-config';

export interface BusinessInsight {
  type: 'alert' | 'opportunity' | 'task' | 'recommendation';
  priority: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  action?: string;
  data?: any;
  automated?: boolean;
}

export class AdminAIAgent {
  private config: any;

  constructor() {
    this.config = getNicheConfig();
  }

  async analyzeBusinessHealth(): Promise<BusinessInsight[]> {
    const insights: BusinessInsight[] = [];
    
    // Fetch all business data
    const [leadsResult, paymentsResult, opportunitiesResult] = await Promise.all([
      cookieBasedClient.models.Lead.list(),
      cookieBasedClient.models.Payment.list(),
      cookieBasedClient.models.Opportunity.list(),
    ]);

    const leads = leadsResult.data || [];
    const payments = paymentsResult.data || [];
    const opportunities = opportunitiesResult.data || [];

    // Analyze overdue payments
    insights.push(...this.analyzeOverduePayments(payments));
    
    // Analyze stale leads
    insights.push(...this.analyzeStaleLeads(leads));
    
    // Analyze missed opportunities
    insights.push(...this.analyzeMissedOpportunities(opportunities));
    
    // Analyze conversion rates
    insights.push(...this.analyzeConversionRates(leads));
    
    // Analyze revenue trends
    insights.push(...this.analyzeRevenueTrends(payments));
    
    // Analyze service scheduling
    insights.push(...this.analyzeServiceScheduling(opportunities));

    return insights.sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });
  }

  private analyzeOverduePayments(payments: any[]): BusinessInsight[] {
    const insights: BusinessInsight[] = [];
    const now = new Date();
    const overdueThreshold = 7 * 24 * 60 * 60 * 1000; // 7 days

    const overduePayments = payments.filter(payment => 
      payment.status === 'pending' && 
      payment.createdAt &&
      (now.getTime() - new Date(payment.createdAt).getTime()) > overdueThreshold
    );

    if (overduePayments.length > 0) {
      insights.push({
        type: 'alert',
        priority: 'high',
        title: `${overduePayments.length} Overdue Payments`,
        description: `You have ${overduePayments.length} payments that are overdue by more than 7 days. Total amount: $${overduePayments.reduce((sum, p) => sum + (p.amount || 0), 0).toFixed(2)}`,
        action: 'Send payment reminders and follow up with customers',
        data: overduePayments,
        automated: true
      });
    }

    return insights;
  }

  private analyzeStaleLeads(leads: any[]): BusinessInsight[] {
    const insights: BusinessInsight[] = [];
    const now = new Date();
    const staleThreshold = 3 * 24 * 60 * 60 * 1000; // 3 days

    const staleLeads = leads.filter(lead => 
      lead.status === 'new' && 
      lead.createdAt &&
      (now.getTime() - new Date(lead.createdAt).getTime()) > staleThreshold
    );

    const qualifiedStaleLeads = staleLeads.filter(lead => lead.isQualified);

    if (qualifiedStaleLeads.length > 0) {
      insights.push({
        type: 'task',
        priority: 'high',
        title: `${qualifiedStaleLeads.length} Qualified Leads Need Follow-up`,
        description: `You have ${qualifiedStaleLeads.length} qualified leads that haven't been contacted in over 3 days. These are hot prospects that need immediate attention.`,
        action: 'Call these leads immediately or schedule follow-up',
        data: qualifiedStaleLeads,
        automated: true
      });
    }

    if (staleLeads.length > qualifiedStaleLeads.length) {
      const unqualifiedStale = staleLeads.length - qualifiedStaleLeads.length;
      insights.push({
        type: 'task',
        priority: 'medium',
        title: `${unqualifiedStale} Unqualified Leads Need Nurturing`,
        description: `You have ${unqualifiedStale} unqualified leads that could be nurtured into opportunities with proper follow-up.`,
        action: 'Send nurture emails or make qualification calls',
        data: staleLeads.filter(lead => !lead.isQualified)
      });
    }

    return insights;
  }

  private analyzeMissedOpportunities(opportunities: any[]): BusinessInsight[] {
    const insights: BusinessInsight[] = [];
    const now = new Date();
    
    const overdueOpportunities = opportunities.filter(opp => 
      opp.serviceDate && 
      new Date(opp.serviceDate) < now && 
      opp.stage === 'scheduled'
    );

    if (overdueOpportunities.length > 0) {
      insights.push({
        type: 'alert',
        priority: 'high',
        title: `${overdueOpportunities.length} Overdue Service Appointments`,
        description: `You have ${overdueOpportunities.length} service appointments that are past due. These need immediate attention to maintain customer satisfaction.`,
        action: 'Contact customers to reschedule or mark as completed',
        data: overdueOpportunities,
        automated: true
      });
    }

    return insights;
  }

  private analyzeConversionRates(leads: any[]): BusinessInsight[] {
    const insights: BusinessInsight[] = [];
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    const recentLeads = leads.filter(lead => 
      new Date(lead.createdAt) >= thirtyDaysAgo
    );

    const conversionRate = recentLeads.length > 0 ? 
      (recentLeads.filter(lead => lead.status === 'converted').length / recentLeads.length) * 100 : 0;

    if (conversionRate < 20) {
      insights.push({
        type: 'recommendation',
        priority: 'medium',
        title: 'Low Conversion Rate Detected',
        description: `Your conversion rate is ${conversionRate.toFixed(1)}%, which is below the industry average of 20-30%. This suggests opportunities for improvement.`,
        action: 'Review qualification process and follow-up procedures',
        data: { conversionRate, recentLeads: recentLeads.length }
      });
    }

    const qualificationRate = recentLeads.length > 0 ?
      (recentLeads.filter(lead => lead.isQualified).length / recentLeads.length) * 100 : 0;

    if (qualificationRate < 40) {
      insights.push({
        type: 'recommendation',
        priority: 'medium',
        title: 'Low Lead Qualification Rate',
        description: `Only ${qualificationRate.toFixed(1)}% of your leads are being qualified. Consider improving your lead sources or qualification criteria.`,
        action: 'Review lead sources and qualification questions',
        data: { qualificationRate }
      });
    }

    return insights;
  }

  private analyzeRevenueTrends(payments: any[]): BusinessInsight[] {
    const insights: BusinessInsight[] = [];
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const sixtyDaysAgo = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000);

    const currentMonthRevenue = payments
      .filter(p => p.status === 'completed' && p.paymentDate && new Date(p.paymentDate) >= thirtyDaysAgo)
      .reduce((sum, p) => sum + (p.amount || 0), 0);

    const previousMonthRevenue = payments
      .filter(p => p.status === 'completed' && p.paymentDate && 
        new Date(p.paymentDate) >= sixtyDaysAgo && new Date(p.paymentDate) < thirtyDaysAgo)
      .reduce((sum, p) => sum + (p.amount || 0), 0);

    if (previousMonthRevenue > 0) {
      const growthRate = ((currentMonthRevenue - previousMonthRevenue) / previousMonthRevenue) * 100;
      
      if (growthRate < -10) {
        insights.push({
          type: 'alert',
          priority: 'high',
          title: 'Revenue Decline Detected',
          description: `Revenue has declined by ${Math.abs(growthRate).toFixed(1)}% compared to last month. Current: $${currentMonthRevenue.toFixed(2)}, Previous: $${previousMonthRevenue.toFixed(2)}`,
          action: 'Analyze causes and implement recovery strategies',
          data: { currentMonthRevenue, previousMonthRevenue, growthRate }
        });
      } else if (growthRate > 20) {
        insights.push({
          type: 'opportunity',
          priority: 'medium',
          title: 'Strong Revenue Growth',
          description: `Revenue has grown by ${growthRate.toFixed(1)}% this month! Consider scaling operations to maintain this growth.`,
          action: 'Plan for increased capacity and marketing investment',
          data: { currentMonthRevenue, previousMonthRevenue, growthRate }
        });
      }
    }

    return insights;
  }

  private analyzeServiceScheduling(opportunities: any[]): BusinessInsight[] {
    const insights: BusinessInsight[] = [];
    const now = new Date();
    const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

    const upcomingServices = opportunities.filter(opp => 
      opp.serviceDate && 
      new Date(opp.serviceDate) >= now && 
      new Date(opp.serviceDate) <= nextWeek &&
      opp.stage === 'scheduled'
    );

    if (upcomingServices.length > 10) {
      insights.push({
        type: 'alert',
        priority: 'medium',
        title: 'Heavy Service Schedule Next Week',
        description: `You have ${upcomingServices.length} services scheduled for next week. Consider your capacity and prepare accordingly.`,
        action: 'Review schedule and consider hiring additional help',
        data: upcomingServices
      });
    }

    const unscheduledOpportunities = opportunities.filter(opp => 
      opp.stage === 'quoted' && 
      !opp.serviceDate
    );

    if (unscheduledOpportunities.length > 0) {
      insights.push({
        type: 'task',
        priority: 'medium',
        title: `${unscheduledOpportunities.length} Quoted Jobs Need Scheduling`,
        description: `You have ${unscheduledOpportunities.length} opportunities that have been quoted but not yet scheduled. Follow up to close these deals.`,
        action: 'Contact customers to schedule services',
        data: unscheduledOpportunities,
        automated: true
      });
    }

    return insights;
  }

  async executeAutomatedAction(insight: BusinessInsight): Promise<boolean> {
    if (!insight.automated) return false;

    try {
      switch (insight.type) {
        case 'alert':
          if (insight.title.includes('Overdue Payments')) {
            return await this.sendPaymentReminders(insight.data);
          }
          break;
        
        case 'task':
          if (insight.title.includes('Qualified Leads Need Follow-up')) {
            return await this.scheduleLeadFollowups(insight.data);
          }
          if (insight.title.includes('Quoted Jobs Need Scheduling')) {
            return await this.sendSchedulingReminders(insight.data);
          }
          break;
      }
    } catch (error) {
      console.error('Automated action failed:', error);
      return false;
    }

    return false;
  }

  private async sendPaymentReminders(overduePayments: any[]): Promise<boolean> {
    // In a real implementation, this would integrate with your email/SMS service
    console.log(`Sending payment reminders to ${overduePayments.length} customers`);
    
    // Update payment records to track reminder sent
    for (const payment of overduePayments) {
      await cookieBasedClient.models.Payment.update({
        id: payment.id,
        notes: `Payment reminder sent on ${new Date().toISOString()}`
      });
    }
    
    return true;
  }

  private async scheduleLeadFollowups(staleLeads: any[]): Promise<boolean> {
    // In a real implementation, this would create tasks in your CRM or calendar
    console.log(`Scheduling follow-ups for ${staleLeads.length} qualified leads`);
    
    // Update lead records to track follow-up scheduled
    for (const lead of staleLeads) {
      await cookieBasedClient.models.Lead.update({
        id: lead.id,
        status: 'contacted',
        notes: `Automated follow-up scheduled on ${new Date().toISOString()}`
      });
    }
    
    return true;
  }

  private async sendSchedulingReminders(opportunities: any[]): Promise<boolean> {
    // In a real implementation, this would send emails/SMS to customers
    console.log(`Sending scheduling reminders for ${opportunities.length} quoted jobs`);
    
    // Update opportunity records
    for (const opp of opportunities) {
      await cookieBasedClient.models.Opportunity.update({
        id: opp.id,
        description: `${opp.description || ''} - Scheduling reminder sent on ${new Date().toISOString()}`
      });
    }
    
    return true;
  }

  generateBusinessSummary(insights: BusinessInsight[]): string {
    const highPriority = insights.filter(i => i.priority === 'high').length;
    const mediumPriority = insights.filter(i => i.priority === 'medium').length;
    const alerts = insights.filter(i => i.type === 'alert').length;
    const tasks = insights.filter(i => i.type === 'task').length;
    const opportunities = insights.filter(i => i.type === 'opportunity').length;

    return `Business Health Summary:
    
🚨 ${highPriority} high-priority items need immediate attention
⚠️ ${mediumPriority} medium-priority items for review
📋 ${tasks} tasks require action
🎯 ${opportunities} growth opportunities identified
⚡ ${alerts} system alerts detected

${highPriority > 0 ? 'URGENT: Address high-priority items first!' : 'Overall business health looks good.'}`;
  }
}
