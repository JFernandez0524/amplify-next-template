'use client';

import { useState } from 'react';
import KPICards from './KPICards';
import LeadsTable from './LeadsTable';
import PaymentsTable from './PaymentsTable';
import OpportunitiesTable from './OpportunitiesTable';
import BusinessSettings from './BusinessSettings';
import AdminAIChat from './AdminAIChat';

interface AdminDashboardProps {
  kpis: any;
  leads: any[];
  payments: any[];
  opportunities: any[];
  config: any;
}

export default function AdminDashboard({ kpis, leads, payments, opportunities, config }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', name: 'Overview', icon: '📊' },
    { id: 'ai-assistant', name: 'AI Assistant', icon: '🤖' },
    { id: 'leads', name: 'Leads', icon: '👥' },
    { id: 'payments', name: 'Payments', icon: '💰' },
    { id: 'opportunities', name: 'Opportunities', icon: '🎯' },
    { id: 'settings', name: 'Settings', icon: '⚙️' },
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
          <KPICards kpis={kpis} config={config} />
          
          {/* Quick Actions */}
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button 
                onClick={() => setActiveTab('leads')}
                className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 text-left"
              >
                <div className="text-2xl mb-2">👥</div>
                <div className="font-medium">Manage Leads</div>
                <div className="text-sm text-gray-500">View and update lead status</div>
              </button>
              
              <button 
                onClick={() => setActiveTab('payments')}
                className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 text-left"
              >
                <div className="text-2xl mb-2">💰</div>
                <div className="font-medium">Track Payments</div>
                <div className="text-sm text-gray-500">Monitor revenue and transactions</div>
              </button>
              
              <button 
                onClick={() => setActiveTab('settings')}
                className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 text-left"
              >
                <div className="text-2xl mb-2">⚙️</div>
                <div className="font-medium">Business Settings</div>
                <div className="text-sm text-gray-500">Configure API keys and preferences</div>
              </button>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {leads.slice(0, 5).map((lead, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                  <div>
                    <div className="font-medium">{lead.firstName} {lead.lastName}</div>
                    <div className="text-sm text-gray-500">
                      {lead.serviceType} • {lead.isQualified ? 'Qualified' : 'Unqualified'}
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">
                    {new Date(lead.createdAt).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'ai-assistant' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AdminAIChat className="h-[600px]" />
            
            <div className="space-y-4">
              <div className="bg-white shadow rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">AI Capabilities</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Monitor overdue payments and send automated reminders</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Track stale leads and schedule follow-ups</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Analyze conversion rates and revenue trends</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Identify missed opportunities and scheduling conflicts</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Execute automated business tasks on your behalf</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Provide actionable business insights and recommendations</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-2">💡 Pro Tip</h4>
                <p className="text-sm text-blue-800">
                  Ask your AI assistant to "analyze my business" for a comprehensive health check, 
                  or say "execute automated tasks" to let it handle routine follow-ups automatically.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'leads' && <LeadsTable leads={leads} />}
      {activeTab === 'payments' && <PaymentsTable payments={payments} />}
      {activeTab === 'opportunities' && <OpportunitiesTable opportunities={opportunities} />}
      {activeTab === 'settings' && <BusinessSettings config={config} />}
    </div>
  );
}
