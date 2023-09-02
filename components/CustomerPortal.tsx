import getCurrentUser from '@/utils/db/get-current-user';
import createCustomerPortalSession from '@/utils/stripe/create-customer-portal-session';

export default async function CustomerPortal() {
  const user = await getCurrentUser();

  if (user?.plan === 'FREE') {
    return null;
  }

  const customerPortalUrl = await createCustomerPortalSession();

  return customerPortalUrl ? (
    <a
      href={customerPortalUrl}
      className="border-blue-400 text-blue-600 hover:bg-blue-200 duration-150 ease-in-out border-2 px-3 py-2 rounded-md font-bold w-max"
    >
      Manage Your Subscription
    </a>
  ) : (
    <p>Loading...</p>
  );
}
