'use client';

import Link from 'next/link';
import { useAuth } from '../lib/auth-context';
import { signOut } from 'aws-amplify/auth';

export function Navigation() {
  const { user, loading } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
      window.location.reload();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (loading) return <nav className="nav">Loading...</nav>;

  return (
    <nav className="nav">
      <div className="nav-brand">
        <Link href="/">MyApp</Link>
      </div>
      
      <div className="nav-links">
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        
        {user ? (
          <>
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/premium">Premium</Link>
            <button onClick={handleSignOut} className="sign-out-btn">
              Sign Out
            </button>
          </>
        ) : (
          <Link href="/auth">Sign In</Link>
        )}
      </div>
    </nav>
  );
}
