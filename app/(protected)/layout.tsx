import { requireAuth } from '../lib/amplify-server-utils';

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // This will redirect to signin if not authenticated
  await requireAuth();
  
  return <>{children}</>;
}
