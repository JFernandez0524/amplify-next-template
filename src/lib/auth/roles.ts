import { cookieBasedClient } from '@/app/lib/amplify-server-utils';

export type UserRole = 'owner' | 'admin' | 'customer' | 'lead' | 'public';

export interface UserPermissions {
  canAccessAdmin: boolean;
  canAccessCustomerPortal: boolean;
  canManageUsers: boolean;
  canViewAnalytics: boolean;
  canProcessPayments: boolean;
  canManageServices: boolean;
}

export async function getUserRole(userId: string, email: string): Promise<UserRole> {
  try {
    const { data: userRoles } = await cookieBasedClient.models.UserRole.list({
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
    const { data: allRoles } = await cookieBasedClient.models.UserRole.list();
    if (allRoles.length === 0) {
      // First user becomes the owner
      await cookieBasedClient.models.UserRole.create({
        userId,
        email,
        role: 'owner',
        permissions: ['all'],
        isActive: true
      });
      return 'owner';
    }

    // Check if they're a customer
    const { data: customers } = await cookieBasedClient.models.Customer.list({
      filter: { email: { eq: email } }
    });
    
    if (customers.length > 0) {
      await cookieBasedClient.models.UserRole.create({
        userId,
        email,
        role: 'customer',
        permissions: ['customer_portal'],
        isActive: true
      });
      return 'customer';
    }

    // Check if they're a lead
    const { data: leads } = await cookieBasedClient.models.Lead.list({
      filter: { email: { eq: email } }
    });
    
    if (leads.length > 0) {
      await cookieBasedClient.models.UserRole.create({
        userId,
        email,
        role: 'lead',
        permissions: ['basic'],
        isActive: true
      });
      return 'lead';
    }

    // Default to customer for authenticated users
    await cookieBasedClient.models.UserRole.create({
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
