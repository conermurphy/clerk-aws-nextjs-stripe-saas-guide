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
      className="flex flex-col items-center justify-center w-full"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-4 w-full">
        <h1 className="text-xl font-bold">Verify your email address</h1>
        <div className="flex flex-col">
          <label htmlFor="code">Verification Code</label>
          <input
            type="text"
            {...register('code', { required: true })}
            className="text-lg p-2 px-3 rounded-md"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-400 text-white font-medium py-2 rounded-md"
        >
          Continue
        </button>
      </div>
    </form>
  );
}
