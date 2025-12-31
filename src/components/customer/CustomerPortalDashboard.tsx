'use client';

import { useState } from 'react';
import ServiceHistory from './ServiceHistory';
import LoyaltyRewards from './LoyaltyRewards';
import ServiceTracking from './ServiceTracking';
import BookNewService from './BookNewService';
import CustomerProfile from './CustomerProfile';

interface CustomerPortalDashboardProps {
  customer: any;
  payments: any[];
  opportunities: any[];
  config: any;
  userProfile: any;
}

export default function CustomerPortalDashboard({ 
  customer, 
  payments, 
  opportunities, 
  config, 
  userProfile 
}: CustomerPortalDashboardProps) {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', name: 'Overview', icon: '📊' },
    { id: 'services', name: 'Service History', icon: '📋' },
    { id: 'tracking', name: 'Track Service', icon: '🚛' },
    { id: 'rewards', name: 'Rewards', icon: '🎁' },
    { id: 'book', name: 'Book Service', icon: '📅' },
    { id: 'profile', name: 'Profile', icon: '👤' },
  ];

  // Calculate customer stats
  const totalSpent = payments.reduce((sum, payment) => sum + (payment.amount || 0), 0);
  const serviceCount = payments.length;
  const loyaltyPoints = Math.floor(totalSpent / 10); // 1 point per $10 spent
  const nextRewardAt = Math.ceil(loyaltyPoints / 100) * 100; // Next reward at 100 points

  const stats = [
    {
      title: 'Total Services',
      value: serviceCount,
      subtitle: 'Completed services',
      icon: '✅',
    },
    {
      title: 'Total Spent',
      value: `$${totalSpent.toFixed(2)}`,
      subtitle: 'Lifetime value',
      icon: '💰',
    },
    {
      title: 'Loyalty Points',
      value: loyaltyPoints,
      subtitle: `${nextRewardAt - loyaltyPoints} to next reward`,
      icon: '⭐',
    },
    {
      title: 'Member Since',
      value: new Date(userProfile.signInDetails?.loginId || Date.now()).getFullYear(),
      subtitle: 'Valued customer',
      icon: '🏆',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Navigation Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="text-2xl">{stat.icon}</div>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          {stat.title}
                        </dt>
                        <dd className="text-lg font-medium text-gray-900">
                          {stat.value}
                        </dd>
                      </dl>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="text-sm text-gray-500">
                      {stat.subtitle}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button 
                onClick={() => setActiveTab('book')}
                className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 text-left"
                style={{ borderColor: config.branding.primaryColor }}
              >
                <div className="text-2xl mb-2">📅</div>
                <div className="font-medium">Book New Service</div>
                <div className="text-sm text-gray-500">Schedule your next {config.business.serviceType.toLowerCase()}</div>
              </button>
              
              <button 
                onClick={() => setActiveTab('tracking')}
                className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 text-left"
              >
                <div className="text-2xl mb-2">🚛</div>
                <div className="font-medium">Track Service</div>
                <div className="text-sm text-gray-500">See when your service team will arrive</div>
              </button>
              
              <button 
                onClick={() => setActiveTab('rewards')}
                className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 text-left"
              >
                <div className="text-2xl mb-2">🎁</div>
                <div className="font-medium">View Rewards</div>
                <div className="text-sm text-gray-500">Check your loyalty points and rewards</div>
              </button>
            </div>
          </div>

          {/* Recent Services */}
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Services</h3>
            {payments.slice(0, 3).map((payment, index) => (
              <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                <div>
                  <div className="font-medium">{config.business.serviceType}</div>
                  <div className="text-sm text-gray-500">
                    {payment.paymentDate ? new Date(payment.paymentDate).toLocaleDateString() : 'Pending'}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium">${payment.amount?.toFixed(2)}</div>
                  <div className={`text-sm ${
                    payment.status === 'completed' ? 'text-green-600' : 'text-yellow-600'
                  }`}>
                    {payment.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'services' && <ServiceHistory payments={payments} config={config} />}
      {activeTab === 'tracking' && <ServiceTracking opportunities={opportunities} config={config} />}
      {activeTab === 'rewards' && <LoyaltyRewards loyaltyPoints={loyaltyPoints} totalSpent={totalSpent} config={config} />}
      {activeTab === 'book' && <BookNewService config={config} />}
      {activeTab === 'profile' && <CustomerProfile customer={customer} userProfile={userProfile} config={config} />}
    </div>
  );
}
