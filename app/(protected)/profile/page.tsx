import { getUserProfile } from '../../lib/amplify-server-utils';

export default async function ProfilePage() {
  const userProfile = await getUserProfile();

  if (!userProfile) {
    return <div>Unable to load profile</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Profile</h1>
      
      <div className="bg-white shadow rounded-lg p-6">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Username</label>
          <p className="mt-1 text-sm text-gray-900">{userProfile.username}</p>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <p className="mt-1 text-sm text-gray-900">{userProfile.attributes?.email || 'Not provided'}</p>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">User ID</label>
          <p className="mt-1 text-sm text-gray-900 font-mono">{userProfile.userId}</p>
        </div>
        
        {userProfile.attributes && Object.keys(userProfile.attributes).length > 0 && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">All Attributes</label>
            <div className="bg-gray-50 p-3 rounded">
              <pre className="text-xs text-gray-600">
                {JSON.stringify(userProfile.attributes, null, 2)}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
