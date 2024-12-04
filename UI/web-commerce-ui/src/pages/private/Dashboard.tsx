import { useAuth } from '@/context';
import { PrivateLayout } from '@/layout';

export const Dashboard = () => {
  const { currentUser } = useAuth();
  currentUser && console.log(currentUser);
  return (
    <PrivateLayout>
      <h1>Dashboard, Hola {currentUser && currentUser.correo}</h1>
    </PrivateLayout>
  );
};
