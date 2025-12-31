'use client';

import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { getNicheConfig } from '@/src/config/niche-config';

export default function AuthPage() {
  const config = getNicheConfig();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Welcome to {config.business.name}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to access your account and manage your services
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <Authenticator
            hideSignUp={false}
            components={{
              Header() {
                return (
                  <div className="text-center mb-6">
                    {config.branding.logoUrl && (
                      <img 
                        src={config.branding.logoUrl} 
                        alt={config.business.name}
                        className="h-12 mx-auto mb-4"
                      />
                    )}
                  </div>
                );
              },
            }}
          >
            {({ signOut, user }) => (
              <div className="text-center">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Welcome, {user?.signInDetails?.loginId}!
                </h3>
                <p className="text-gray-600 mb-6">
                  You're successfully signed in. You can now access your account features.
                </p>
                <div className="space-y-3">
                  <a
                    href="/customer-portal"
                    className="block w-full px-4 py-2 text-white rounded-lg hover:opacity-90 transition-colors"
                    style={{ backgroundColor: config.branding.primaryColor }}
                  >
                    Go to My Account
                  </a>
                  <a
                    href="/"
                    className="block w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Back to Home
                  </a>
                  <button
                    onClick={signOut}
                    className="block w-full px-4 py-2 text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </Authenticator>
        </div>
      </div>
    </div>
  );
}
