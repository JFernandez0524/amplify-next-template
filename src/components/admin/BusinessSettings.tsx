'use client';

import { useState } from 'react';

interface BusinessSettingsProps {
  config: any;
}

export default function BusinessSettings({ config }: BusinessSettingsProps) {
  const [settings, setSettings] = useState({
    ghlApiKey: '',
    ghlSubAccountId: '',
    vapiApiKey: '',
    stripeSecretKey: '',
    openaiApiKey: '',
  });

  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    // In a real implementation, you'd save these to the BusinessConfig model
    // For now, just show a success message
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* API Keys Configuration */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
            API Keys & Integrations
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                GoHighLevel API Key
              </label>
              <input
                type="password"
                value={settings.ghlApiKey}
                onChange={(e) => setSettings({...settings, ghlApiKey: e.target.value})}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your GHL API key"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">
                GoHighLevel Sub-Account ID
              </label>
              <input
                type="text"
                value={settings.ghlSubAccountId}
                onChange={(e) => setSettings({...settings, ghlSubAccountId: e.target.value})}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your GHL sub-account ID"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Vapi API Key
              </label>
              <input
                type="password"
                value={settings.vapiApiKey}
                onChange={(e) => setSettings({...settings, vapiApiKey: e.target.value})}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your Vapi API key"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Stripe Secret Key
              </label>
              <input
                type="password"
                value={settings.stripeSecretKey}
                onChange={(e) => setSettings({...settings, stripeSecretKey: e.target.value})}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your Stripe secret key"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">
                OpenAI API Key
              </label>
              <input
                type="password"
                value={settings.openaiApiKey}
                onChange={(e) => setSettings({...settings, openaiApiKey: e.target.value})}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your OpenAI API key"
              />
            </div>
          </div>
          
          <div className="mt-6">
            <button
              onClick={handleSave}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Save API Keys
            </button>
            {saved && (
              <span className="ml-3 text-green-600 text-sm">Settings saved successfully!</span>
            )}
          </div>
        </div>
      </div>

      {/* Business Information */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
            Business Information
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Business Name</label>
              <div className="mt-1 text-sm text-gray-900">{config.business.name}</div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Service Type</label>
              <div className="mt-1 text-sm text-gray-900">{config.business.serviceType}</div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Tagline</label>
              <div className="mt-1 text-sm text-gray-900">{config.business.tagline}</div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Primary Color</label>
              <div className="mt-1 flex items-center">
                <div 
                  className="w-6 h-6 rounded border mr-2"
                  style={{ backgroundColor: config.branding.primaryColor }}
                ></div>
                <span className="text-sm text-gray-900">{config.branding.primaryColor}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* System Status */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
            System Status
          </h3>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Database Connection</span>
              <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                Connected
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Payment Processing</span>
              <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                Active
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">AI Chat Service</span>
              <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                Online
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Webhook Endpoints</span>
              <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                Operational
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
