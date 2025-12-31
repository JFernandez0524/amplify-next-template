'use client';

interface CustomerProfileProps {
  customer: any;
  userProfile: any;
  config: any;
}

export default function CustomerProfile({ customer, userProfile, config }: CustomerProfileProps) {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Profile Information</h3>
      
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">First Name</label>
            <div className="mt-1 text-sm text-gray-900">
              {userProfile.attributes?.given_name || userProfile.username}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Last Name</label>
            <div className="mt-1 text-sm text-gray-900">
              {userProfile.attributes?.family_name || 'Not provided'}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <div className="mt-1 text-sm text-gray-900">
              {userProfile.attributes?.email}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <div className="mt-1 text-sm text-gray-900">
              {userProfile.attributes?.phone_number || 'Not provided'}
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-6">
          <h4 className="text-md font-medium text-gray-900 mb-4">Preferences</h4>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Preferred Contact Method
              </label>
              <select className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500">
                <option>Phone</option>
                <option>Email</option>
                <option>SMS</option>
              </select>
            </div>
            
            <div>
              <label className="flex items-center">
                <input type="checkbox" className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
                <span className="ml-2 text-sm text-gray-700">
                  Send me promotional offers and discounts
                </span>
              </label>
            </div>
            
            <div>
              <label className="flex items-center">
                <input type="checkbox" className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
                <span className="ml-2 text-sm text-gray-700">
                  Send service reminders and updates
                </span>
              </label>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end">
          <button 
            className="px-4 py-2 text-white rounded-lg hover:opacity-90 transition-colors"
            style={{ backgroundColor: config.branding.primaryColor }}
          >
            Update Profile
          </button>
        </div>
      </div>
    </div>
  );
}
