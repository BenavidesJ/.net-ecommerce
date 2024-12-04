import { UserDataCard } from '@/components/custom';
import { PrivateLayout } from '@/layout';
import { SingleUserResponse } from '@/services/types';
import { getUsers } from '@/services/user';
import { useEffect, useState } from 'react';

export const GestionUsuarios = () => {
  const [users, setUsers] = useState<SingleUserResponse[]>();
  const handleGetUsers = async () => {
    const data = await getUsers();
    setUsers(data);
  };
  useEffect(() => {
    handleGetUsers();
  }, []);
  return (
    <PrivateLayout>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-3">
        {users &&
          users.map((user) => (
            <UserDataCard
              id={user.id}
              name={user.nombre}
              lastname={user.apellido}
              email={user.correo}
              address={user.direccion}
              phone={user.telefono}
            />
          ))}
      </div>
    </PrivateLayout>
  );
};
