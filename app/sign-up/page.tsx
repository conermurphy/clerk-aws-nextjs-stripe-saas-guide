import Link from 'next/link';
import SignUpForm from '@/components/auth/SignUpForm';

export default function Page() {
  return (
    <div className="flex flex-col gap-4">
      <SignUpForm />
      <div className="flex flex-row items-center gap-1">
        <p>Have an account already?</p>
        <Link href="/sign-in" className="text-blue-600 font-bold">
          Sign In
        </Link>
      </div>
    </div>
  );
}
