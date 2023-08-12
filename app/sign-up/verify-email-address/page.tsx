import AuthWrapper from '@/components/auth/AuthWrapper';
import CodeForm from '@/components/auth/CodeForm';

export default function Page() {
  return (
    <AuthWrapper>
      <CodeForm />
    </AuthWrapper>
  );
}
