import Link from 'next/link';
import SignInForm from '@/components/auth/SignInForm';

export default function Page() {
  return (
    <div className="flex flex-col gap-4">
      <SignInForm />
      <div className="flex flex-row items-center gap-1">
        <p>Don't have an account?</p>
        <Link href="/sign-up" className="text-blue-600 font-bold">
          Sign Up
        </Link>
      </div>
    </div>
  );
}
