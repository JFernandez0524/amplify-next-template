'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signOut } from 'aws-amplify/auth';
import { getNicheConfig } from '@/src/config/niche-config';
import { 
  getCurrentUserClient, 
  getUserRoleClient, 
  getUserPermissions, 
  type UserRole 
} from '@/src/lib/auth/client-auth';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [userRole, setUserRole] = useState<UserRole>('public');
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const config = getNicheConfig();

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const currentUser = await getCurrentUserClient();
      setUser(currentUser);
      
      if (currentUser) {
        const role = await getUserRoleClient(
          currentUser.userId, 
          currentUser.signInDetails?.loginId || ''
        );
        setUserRole(role);
      }
    } catch (error) {
      setUser(null);
      setUserRole('public');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      setUser(null);
      setUserRole('public');
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const permissions = getUserPermissions(userRole);

  const getNavigationItems = () => {
    const items = [
      { name: 'Home', href: '/', show: true },
    ];

    if (user) {
      if (permissions.canAccessCustomerPortal) {
        items.push({ name: 'My Account', href: '/customer-portal', show: true });
      }
      
      if (permissions.canAccessAdmin) {
        items.push({ name: 'Admin Dashboard', href: '/admin', show: true });
      }
    }

    return items.filter(item => item.show);
  };

  const navigationItems = getNavigationItems();

  if (isLoading) {
    return (
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="h-8 w-32 bg-gray-200 animate-pulse rounded"></div>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              {config.branding.logoUrl ? (
                <img 
                  className="h-8 w-auto" 
                  src={config.branding.logoUrl} 
                  alt={config.business.name}
                />
              ) : (
                <span 
                  className="text-xl font-bold"
                  style={{ color: config.branding.primaryColor }}
                >
                  {config.business.name}
                </span>
              )}
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                {item.name}
              </Link>
            ))}

            {/* Phone Number */}
            <a
              href={`tel:${config.vapi.phoneNumber || '555-123-4567'}`}
              className="text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              style={{ backgroundColor: config.branding.primaryColor }}
            >
              📞 {config.vapi.phoneNumber || '(555) 123-4567'}
            </a>

            {/* User Menu */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center">
                    <span className="text-sm font-medium text-gray-700">
                      {user.signInDetails?.loginId?.charAt(0).toUpperCase() || 'U'}
                    </span>
                  </div>
                </button>

                {isOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="py-1">
                      <div className="px-4 py-2 text-sm text-gray-700 border-b">
                        <div className="font-medium">{user.signInDetails?.loginId}</div>
                        <div className="text-xs text-gray-500 capitalize">{userRole} Account</div>
                      </div>
                      
                      {permissions.canAccessCustomerPortal && (
                        <Link
                          href="/customer-portal"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsOpen(false)}
                        >
                          My Account
                        </Link>
                      )}
                      
                      {permissions.canAccessAdmin && (
                        <Link
                          href="/admin"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsOpen(false)}
                        >
                          Admin Dashboard
                        </Link>
                      )}
                      
                      <Link
                        href="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsOpen(false)}
                      >
                        Profile Settings
                      </Link>
                      
                      <button
                        onClick={handleSignOut}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/auth"
                className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-gray-900 focus:outline-none focus:text-gray-900"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              <a
                href={`tel:${config.vapi.phoneNumber || '555-123-4567'}`}
                className="block text-white px-3 py-2 rounded-md text-base font-medium"
                style={{ backgroundColor: config.branding.primaryColor }}
              >
                📞 Call Now
              </a>

              {user ? (
                <div className="border-t pt-4">
                  <div className="px-3 py-2 text-sm text-gray-500">
                    {user.signInDetails?.loginId} ({userRole})
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <Link
                  href="/auth"
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900"
                  onClick={() => setIsOpen(false)}
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
