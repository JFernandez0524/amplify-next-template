'use client';

import { useAuth } from '../lib/auth-context';
import Link from 'next/link';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireMembership?: boolean;
}

export function ProtectedRoute({ children, requireMembership = false }: ProtectedRouteProps) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!user) {
    return (
      <div className="auth-required">
        <h2>Authentication Required</h2>
        <p>Please sign in to access this page.</p>
        <Link href="/auth" className="auth-link">Sign In</Link>
      </div>
    );
  }

  // Check membership status (you'll implement this based on your user attributes)
  if (requireMembership) {
    // For now, we'll assume all authenticated users have membership
    // You can extend this to check user attributes or make an API call
    const hasMembership = true; // Replace with actual membership check
    
    if (!hasMembership) {
      return (
        <div className="membership-required">
          <h2>Premium Membership Required</h2>
          <p>This feature requires a premium membership.</p>
          <Link href="/upgrade" className="upgrade-link">Upgrade Now</Link>
        </div>
      );
    }
  }

  return <>{children}</>;
}
