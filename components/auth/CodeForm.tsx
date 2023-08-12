'use client';

import { useSignUp } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

export default function CodeForm() {
  const router = useRouter();
  const { register, handleSubmit } = useForm<{
    code: string;
  }>();
  const { signUp, setActive } = useSignUp();

  const onSubmit = async ({ code }: { code: string }) => {
    try {
      if (!signUp) {
        // eslint-disable-next-line no-console
        console.log('Clerk sign up not avaialble');
        return null;
      }

      const response = await signUp.attemptEmailAddressVerification({
        code,
      });

      await setActive({ session: response.createdSessionId });

      await fetch('/api/user', {
        method: 'POST',
      });

      router.push('/');
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

  return (
    <form
      className="flex flex-col items-center justify-center min-h-screen"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-8 border-2 border-gray-600 rounded-md p-6 bg-white">
        <h1 className="text-xl font-bold">Verify your email address</h1>
        <div className="flex flex-col">
          <label htmlFor="code">Verification Code</label>
          <input
            type="text"
            {...register('code', { required: true })}
            className="border-gray-300 rounded-md"
          />
        </div>
        <button
          type="submit"
          className="bg-[#0D33BF] text-white font-medium py-2 rounded-sm"
        >
          Continue
        </button>
      </div>
    </form>
  );
}
