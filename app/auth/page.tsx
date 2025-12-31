'use client';

import { Authenticator } from '@aws-amplify/ui-react';
import { Navigation } from '../components/Navigation';
import '@aws-amplify/ui-react/styles.css';

export default function AuthPage() {
  return (
    <>
      <Navigation />
      <main className="main">
        <h1>Sign In</h1>
        <Authenticator socialProviders={['google']} />
      </main>
    </>
  );
}
