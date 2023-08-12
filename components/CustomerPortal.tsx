import getCurrentUser from '@/utils/db/get-current-user';
import createCustomerPortalSession from '@/utils/stripe/create-customer-portal-session';

export default async function CustomerPortal() {
  const user = await getCurrentUser();

  if (user?.plan === 'FREE') {
    return null;
  }

  const customerPortalUrl = await createCustomerPortalSession();

  return customerPortalUrl ? (
    <a href={customerPortalUrl}>Manage Your Subscription</a>
  ) : (
    <p>Loading...</p>
  );
}
