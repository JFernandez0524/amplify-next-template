import { createServerRunner } from '@aws-amplify/adapter-nextjs';
import { generateServerClientUsingCookies } from '@aws-amplify/adapter-nextjs/data';
import { fetchAuthSession, getCurrentUser, fetchUserAttributes } from 'aws-amplify/auth/server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import config from '../../amplify_outputs.json';
import type { Schema } from '../../amplify/data/resource';

export const { runWithAmplifyServerContext } = createServerRunner({
  config,
});

export const cookieBasedClient = generateServerClientUsingCookies<Schema>({
  config,
  cookies,
});

// Helper function to get current user session
export async function getUserSession() {
  try {
    return await runWithAmplifyServerContext({
      nextServerContext: { cookies },
      operation: (contextSpec) => getCurrentUser(contextSpec)
    });
  } catch {
    return null;
  }
}

// Helper function to get user attributes
export async function getUserAttributes() {
  try {
    return await runWithAmplifyServerContext({
      nextServerContext: { cookies },
      operation: (contextSpec) => fetchUserAttributes(contextSpec)
    });
  } catch {
    return null;
  }
}

// Helper function to get full user profile
export async function getUserProfile() {
  try {
    const [user, attributes] = await Promise.all([
      getUserSession(),
      getUserAttributes()
    ]);
    
    if (!user) return null;
    
    return {
      ...user,
      attributes
    };
  } catch {
    return null;
  }
}

// Helper function to require authentication (redirect if not authenticated)
export async function requireAuth() {
  const user = await getUserSession();
  if (!user) {
    redirect('/auth/signin');
  }
  return user;
}
