import { cookieBasedClient, getUserProfile } from '@/app/lib/amplify-server-utils';
import { getNicheConfig } from '@/src/config/niche-config';
import CustomerPortalDashboard from '@/src/components/customer/CustomerPortalDashboard';

export default async function CustomerPortalPage() {
  const config = getNicheConfig();
  const userProfile = await getUserProfile();
  
  if (!userProfile) {
    return <div>Please log in to access your customer portal.</div>;
  }

  // Fetch customer data
  const [customerResult, paymentsResult, opportunitiesResult] = await Promise.all([
    cookieBasedClient.models.Customer.list({
      filter: { email: { eq: userProfile.attributes?.email } }
    }),
    cookieBasedClient.models.Payment.list(),
    cookieBasedClient.models.Opportunity.list(),
  ]);

  const customer = customerResult.data?.[0];
  const payments = paymentsResult.data || [];
  const opportunities = opportunitiesResult.data || [];

  // Filter user's data
  const userPayments = payments.filter(p => p.status === 'completed');
  const userOpportunities = opportunities;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {userProfile.attributes?.given_name || userProfile.username}!
          </h1>
          <p className="text-gray-600">
            Manage your {config.business.serviceType.toLowerCase()} services and track your rewards
          </p>
        </div>

        <CustomerPortalDashboard 
          customer={customer}
          payments={userPayments}
          opportunities={userOpportunities}
          config={config}
          userProfile={userProfile}
        />
      </div>
    </div>
  );
}
