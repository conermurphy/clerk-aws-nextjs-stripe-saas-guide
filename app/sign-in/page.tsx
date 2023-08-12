import Link from 'next/link';
import AuthWrapper from '@/components/auth/AuthWrapper';
import SignInForm from '@/components/auth/SignInForm';

export default function Page() {
  return (
    <AuthWrapper>
      <SignInForm />
      <Link href="/sign-up" className="text-black">
        Goto Sign Up
      </Link>
    </AuthWrapper>
  );
}
