'use client';

import { useSignUp } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

interface SignUpFormValues {
  email: string;
  password: string;
}

export default function SignUpForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const { register, handleSubmit } = useForm<SignUpFormValues>();
  const { signUp } = useSignUp();

  const onSubmit = async ({ email, password }: SignUpFormValues) => {
    try {
      if (!signUp) {
        // eslint-disable-next-line no-console
        console.log('Clerk sign up not avaialble');
        return null;
      }

      const response = await signUp.create({
        emailAddress: email,
        password,
      });

      if (response.unverifiedFields.includes('email_address')) {
        await signUp.prepareEmailAddressVerification({
          strategy: 'email_code',
        });

        router.push('/sign-up/verify-email-address');
      }
    } catch (err) {
      setError('Email address already in use');
      // eslint-disable-next-line no-console
      console.error(err);
    }
  };

  return (
    <form
      className="flex flex-col items-center justify-center bg-white"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-8 border-2 border-gray-600 rounded-md p-6 bg-white">
        <h1 className="text-xl font-bold">Sign Up</h1>
        <div className="flex flex-col">
          <label htmlFor="email">Email Address</label>
          <input
            type="text"
            {...register('email', { required: true })}
            className="border-gray-300 rounded-md"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            {...register('password', { required: true })}
            className="border-gray-300 rounded-md"
          />
        </div>
        <button
          type="submit"
          className="bg-[#0D33BF] text-white font-medium py-2 rounded-sm"
        >
          Continue
        </button>
        {error ? <p className="text-red-500">{error}</p> : null}
      </div>
    </form>
  );
}
