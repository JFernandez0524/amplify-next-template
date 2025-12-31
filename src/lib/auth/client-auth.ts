import { getCurrentUser, fetchUserAttributes } from 'aws-amplify/auth';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '@/amplify/data/resource';

const client = generateClient<Schema>();

export type UserRole = 'owner' | 'admin' | 'customer' | 'lead' | 'public';

export interface UserPermissions {
  canAccessAdmin: boolean;
  canAccessCustomerPortal: boolean;
  canManageUsers: boolean;
  canViewAnalytics: boolean;
  canProcessPayments: boolean;
  canManageServices: boolean;
}

export async function getCurrentUserClient() {
  try {
    return await getCurrentUser();
  } catch {
    return null;
  }
}

export async function getUserAttributesClient() {
  try {
    return await fetchUserAttributes();
  } catch {
    return null;
  }
}

export async function getUserRoleClient(userId: string, email: string): Promise<UserRole> {
  try {
    const { data: userRoles } = await client.models.UserRole.list({
      filter: { 
        or: [
          { userId: { eq: userId } },
          { email: { eq: email } }
        ]
      }
    });

    if (userRoles.length > 0) {
      return userRoles[0].role as UserRole;
    }

    // Check if this is the first user (business owner)
    const { data: allRoles } = await client.models.UserRole.list();
    if (allRoles.length === 0) {
      // First user becomes the owner
      await client.models.UserRole.create({
        userId,
        email,
        role: 'owner',
        permissions: ['all'],
        isActive: true
      });
      return 'owner';
    }

    // Check if they're a customer
    const { data: customers } = await client.models.Customer.list({
      filter: { email: { eq: email } }
    });
    
    if (customers.length > 0) {
      await client.models.UserRole.create({
        userId,
        email,
        role: 'customer',
        permissions: ['customer_portal'],
        isActive: true
      });
      return 'customer';
    }

    // Check if they're a lead
    const { data: leads } = await client.models.Lead.list({
      filter: { email: { eq: email } }
    });
    
    if (leads.length > 0) {
      await client.models.UserRole.create({
        userId,
        email,
        role: 'lead',
        permissions: ['basic'],
        isActive: true
      });
      return 'lead';
    }

    // Default to customer for authenticated users
    await client.models.UserRole.create({
      userId,
      email,
      role: 'customer',
      permissions: ['customer_portal'],
      isActive: true
    });
    return 'customer';

  } catch (error) {
    console.error('Error getting user role:', error);
    return 'public';
  }
}

export function getUserPermissions(role: UserRole): UserPermissions {
  switch (role) {
    case 'owner':
      return {
        canAccessAdmin: true,
        canAccessCustomerPortal: true,
        canManageUsers: true,
        canViewAnalytics: true,
        canProcessPayments: true,
        canManageServices: true,
      };
    
    case 'admin':
      return {
        canAccessAdmin: true,
        canAccessCustomerPortal: false,
        canManageUsers: false,
        canViewAnalytics: true,
        canProcessPayments: true,
        canManageServices: true,
      };
    
    case 'customer':
      return {
        canAccessAdmin: false,
        canAccessCustomerPortal: true,
        canManageUsers: false,
        canViewAnalytics: false,
        canProcessPayments: false,
        canManageServices: false,
      };
    
    case 'lead':
      return {
        canAccessAdmin: false,
        canAccessCustomerPortal: false,
        canManageUsers: false,
        canViewAnalytics: false,
        canProcessPayments: false,
        canManageServices: false,
      };
    
    default: // public
      return {
        canAccessAdmin: false,
        canAccessCustomerPortal: false,
        canManageUsers: false,
        canViewAnalytics: false,
        canProcessPayments: false,
        canManageServices: false,
      };
  }
}
