'use client';

import { Navigation } from '../components/Navigation';
import { ProtectedRoute } from '../components/ProtectedRoute';

export default function PremiumPage() {
  return (
    <>
      <Navigation />
      <ProtectedRoute requireMembership={true}>
        <main className="main">
          <h1>Premium Features</h1>
          <p>Welcome to our premium content!</p>
          <p>This page requires both authentication and membership access.</p>
          
          <div className="premium-features">
            <div className="premium-card">
              <h3>📊 Advanced Analytics</h3>
              <p>Deep insights into your data</p>
            </div>
            <div className="premium-card">
              <h3>🚀 Priority Support</h3>
              <p>Get help when you need it</p>
            </div>
            <div className="premium-card">
              <h3>🎯 Custom Features</h3>
              <p>Tailored to your needs</p>
            </div>
          </div>
        </main>
      </ProtectedRoute>
    </>
  );
}
