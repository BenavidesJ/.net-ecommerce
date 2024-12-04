import { AuthForm } from '@/components/custom';
import { Layout } from '@/layout';

export const Login = () => {
  return (
    <Layout>
      <main className="flex flex-col items-center justify-center min-h-screen">
        <AuthForm mode="login" />
      </main>
    </Layout>
  );
};
