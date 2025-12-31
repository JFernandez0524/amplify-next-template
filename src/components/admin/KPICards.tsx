'use client';

interface KPICardsProps {
  kpis: {
    totalLeads: number;
    monthlyLeads: number;
    weeklyLeads: number;
    qualifiedLeads: number;
    conversionRate: number;
    totalRevenue: number;
    averageOrderValue: number;
    activeOpportunities: number;
  };
  config: any;
}

export default function KPICards({ kpis, config }: KPICardsProps) {
  const cards = [
    {
      title: 'Total Leads',
      value: kpis.totalLeads,
      change: `+${kpis.weeklyLeads} this week`,
      changeType: 'positive',
      icon: '👥',
    },
    {
      title: 'Qualified Leads',
      value: kpis.qualifiedLeads,
      change: `${((kpis.qualifiedLeads / kpis.totalLeads) * 100 || 0).toFixed(1)}% qualification rate`,
      changeType: 'neutral',
      icon: '✅',
    },
    {
      title: 'Conversion Rate',
      value: `${kpis.conversionRate.toFixed(1)}%`,
      change: 'Last 30 days',
      changeType: 'neutral',
      icon: '📈',
    },
    {
      title: 'Monthly Revenue',
      value: `$${kpis.totalRevenue.toLocaleString()}`,
      change: `$${kpis.averageOrderValue.toFixed(0)} avg order`,
      changeType: 'positive',
      icon: '💰',
    },
    {
      title: 'Active Opportunities',
      value: kpis.activeOpportunities,
      change: 'In pipeline',
      changeType: 'neutral',
      icon: '🎯',
    },
    {
      title: 'Monthly Leads',
      value: kpis.monthlyLeads,
      change: 'Last 30 days',
      changeType: 'neutral',
      icon: '📊',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cards.map((card, index) => (
        <div key={index} className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="text-2xl">{card.icon}</div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    {card.title}
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {card.value}
                  </dd>
                </dl>
              </div>
            </div>
            <div className="mt-4">
              <div className={`text-sm ${
                card.changeType === 'positive' ? 'text-green-600' : 
                card.changeType === 'negative' ? 'text-red-600' : 'text-gray-500'
              }`}>
                {card.change}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
