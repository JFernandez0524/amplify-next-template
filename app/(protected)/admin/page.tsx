import { cookieBasedClient } from '@/app/lib/amplify-server-utils';
import { getNicheConfig } from '@/src/config/niche-config';
import AdminDashboard from '@/src/components/admin/AdminDashboard';

export default async function AdminPage() {
  const config = getNicheConfig();
  
  // Fetch dashboard data
  const [leadsResult, paymentsResult, opportunitiesResult] = await Promise.all([
    cookieBasedClient.models.Lead.list(),
    cookieBasedClient.models.Payment.list(),
    cookieBasedClient.models.Opportunity.list(),
  ]);

  const leads = leadsResult.data || [];
  const payments = paymentsResult.data || [];
  const opportunities = opportunitiesResult.data || [];

  // Calculate KPIs
  const now = new Date();
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  const recentLeads = leads.filter(lead => 
    new Date(lead.createdAt) >= thirtyDaysAgo
  );
  
  const recentPayments = payments.filter(payment => 
    payment.status === 'completed' && 
    payment.paymentDate && 
    new Date(payment.paymentDate) >= thirtyDaysAgo
  );

  const weeklyLeads = leads.filter(lead => 
    new Date(lead.createdAt) >= sevenDaysAgo
  );

  const kpis = {
    totalLeads: leads.length,
    monthlyLeads: recentLeads.length,
    weeklyLeads: weeklyLeads.length,
    qualifiedLeads: leads.filter(lead => lead.isQualified).length,
    conversionRate: leads.length > 0 ? (leads.filter(lead => lead.status === 'converted').length / leads.length * 100) : 0,
    totalRevenue: recentPayments.reduce((sum, payment) => sum + (payment.amount || 0), 0),
    averageOrderValue: recentPayments.length > 0 ? recentPayments.reduce((sum, payment) => sum + (payment.amount || 0), 0) / recentPayments.length : 0,
    activeOpportunities: opportunities.filter(opp => !['completed', 'cancelled'].includes(opp.stage || '')).length,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            {config.business.name} - Admin Dashboard
          </h1>
          <p className="text-gray-600">
            Manage your {config.business.serviceType.toLowerCase()} business operations and track performance
          </p>
        </div>

        <AdminDashboard 
          kpis={kpis}
          leads={leads}
          payments={payments}
          opportunities={opportunities}
          config={config}
        />
      </div>
    </div>
  );
}
