import Link from 'next/link';
import AuthWrapper from '@/components/auth/AuthWrapper';
import SignUpForm from '@/components/auth/SignUpForm';

export default function Page() {
  return (
    <AuthWrapper>
      <SignUpForm />
      <Link href="/sign-in" className="text-black">
        Goto Sign In
      </Link>
    </AuthWrapper>
  );
}
