import { UserDataCard } from '@/components/custom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context';
import { PrivateLayout } from '@/layout';
import { SingleUserResponse } from '@/services/types';
import { getUsers } from '@/services/user';
import { UserPlusIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const GestionUsuarios = () => {
  const nav = useNavigate();
  const { currentUser } = useAuth();
  const [users, setUsers] = useState<SingleUserResponse[]>();
  const handleGetUsers = async () => {
    const data = await getUsers();
    setUsers(data);
  };
  const handleUserDeleted = (userId: number) => {
    setUsers(
      (prevUsers) => prevUsers && prevUsers.filter((user) => user.id !== userId)
    );
  };

  const handleUserModified = (modifiedUser: SingleUserResponse) => {
    setUsers((prevUsers) => {
      return prevUsers?.map((user) =>
        user.nombre === modifiedUser.nombre
          ? { ...user, ...modifiedUser }
          : user
      );
    });
  };

  useEffect(() => {
    handleGetUsers();
  }, []);
  return (
    <PrivateLayout>
      <div className="grid grid-cols-1 px-3 py-3 justify-items-center">
        <Button
          onClick={() => nav('/gestion-usuarios/agregar', { replace: true })}
          className="bg-green-500 text-white text-lg flex items-center gap-2 px-4 py-2 rounded hover:bg-green-600"
        >
          <UserPlusIcon className="h-6 w-6" />
          Crear Usuario
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-3">
        {users &&
          users.map((user) => (
            <UserDataCard
              key={`user-${user.correo}-${user.id}`}
              id={user.id}
              name={user.nombre}
              lastname={user.apellido}
              email={user.correo}
              address={user.direccion}
              phone={user.telefono}
              currentUserId={currentUser?.id}
              onDelete={handleUserDeleted}
              onModify={handleUserModified}
            />
          ))}
      </div>
    </PrivateLayout>
  );
};
