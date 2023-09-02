'use client';

import { useSignIn } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

interface SignUpFormValues {
  email: string;
  password: string;
}

export default function SignInForm() {
  const router = useRouter();
  const { register, handleSubmit } = useForm<SignUpFormValues>();
  const { signIn, setActive } = useSignIn();

  const onSubmit = async ({ email, password }: SignUpFormValues) => {
    try {
      if (!signIn) {
        // eslint-disable-next-line no-console
        console.log('Clerk sign in not avaialble');
        return null;
      }

      const response = await signIn.create({
        identifier: email,
        password,
      });

      await setActive({ session: response.createdSessionId });
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
        <h1 className="text-2xl font-bold">Sign In</h1>
        <div className="flex flex-col">
          <label htmlFor="email">Email Address</label>
          <input
            type="text"
            {...register('email', { required: true })}
            className="text-lg p-2 px-3 rounded-md"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            {...register('password', { required: true })}
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
