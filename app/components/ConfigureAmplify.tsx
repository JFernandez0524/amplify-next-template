'use client';

import { Amplify } from 'aws-amplify';
import outputs from '../../amplify_outputs.json';
import { AuthProvider } from '../lib/auth-context';

Amplify.configure(outputs, { ssr: true });

export function ConfigureAmplifyClientSide({ children }: { children?: React.ReactNode }) {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  );
}
