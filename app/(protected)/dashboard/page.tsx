'use client';

import { Navigation } from '../components/Navigation';
import { ProtectedRoute } from '../components/ProtectedRoute';

export default function DashboardPage() {
  return (
    <>
      <Navigation />
      <ProtectedRoute>
        <main className="main">
          <h1>Dashboard</h1>
          <p>Welcome to your protected dashboard!</p>
          <p>This page requires authentication to access.</p>
          
          <div className="dashboard-grid">
            <div className="dashboard-card">
              <h3>Profile</h3>
              <p>Manage your account settings</p>
            </div>
            <div className="dashboard-card">
              <h3>Activity</h3>
              <p>View your recent activity</p>
            </div>
            <div className="dashboard-card">
              <h3>Settings</h3>
              <p>Configure your preferences</p>
            </div>
          </div>
        </main>
      </ProtectedRoute>
    </>
  );
}
