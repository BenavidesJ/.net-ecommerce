import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Edit, Trash2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { eliminateUser } from '@/services/user';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router';
import { EditUserModal } from './EditUserModal';
import { SingleUserResponse } from '@/services/types';

interface UserData {
  id: number;
  name?: string | null;
  lastname?: string | null;
  address: string | null | undefined;
  email: string | null;
  phone: string | null | undefined;
  currentUserId: number | undefined;
  onDelete: (userId: number) => void;
  onModify: (modifiedUser: SingleUserResponse) => void;
}

const getInitials = (
  id: number,
  name: string | null | undefined,
  lastname: string | null | undefined
): string => {
  if (!name && !lastname) {
    return `U-${id}`;
  }
  return `${name?.charAt(0)}${lastname?.charAt(0)}`.toUpperCase();
};

export const UserDataCard: React.FC<UserData> = ({
  id,
  name,
  lastname,
  address,
  email,
  phone,
  currentUserId,
  onDelete,
  onModify,
}) => {
  const navigate = useNavigate();
  const [deleteUser, setDeleteUser] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const initials = getInitials(id, name, lastname);
  const { toast } = useToast();

  return (
    <Card className="w-full max-w-md mx-auto" key={`user-${initials}-${id}`}>
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="h-12 w-12">
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        <CardTitle>
          {!name && !lastname ? `Usuario #${id}` : `${name} ${lastname}`}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <dl className="grid grid-cols-1 gap-2 text-sm">
          <div>
            <dt className="font-semibold">Direccion:</dt>
            <dd className={!address ? 'bg-gray-200 text-yellow-600' : ''}>
              {address || 'Por favor ingrese la informacion'}
            </dd>
          </div>
          <div>
            <dt className="font-semibold">Correo:</dt>
            <dd className={!email ? 'bg-gray-200 text-yellow-600' : ''}>
              {email || 'Por favor ingrese la informacion'}
            </dd>
          </div>
          <div>
            <dt className="font-semibold">Telefono:</dt>
            <dd className={!phone ? 'bg-gray-200 text-yellow-600' : ''}>
              {phone || 'Por favor ingrese la informacion'}
            </dd>
          </div>
        </dl>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          variant="destructive"
          className="bg-red-600 text-white hover:bg-red-700"
          onClick={() => setDeleteUser(true)}
          disabled={currentUserId === id}
        >
          <Trash2 className="mr-2 h-4 w-4" /> Eliminar
        </Button>
        <Button
          className="bg-blue-600 text-white hover:bg-blue-700"
          onClick={() => setIsModalOpen(true)}
        >
          <Edit className="mr-2 h-4 w-4" /> Editar
        </Button>
      </CardFooter>

      <AlertDialog open={deleteUser}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Esta seguro de eliminar a{' '}
              {!name && !lastname ? `Usuario #${id}` : `${name} ${lastname}`}?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Una vez borrado, se eliminara de la base de datos.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              onClick={() => {
                setDeleteUser(false);
              }}
            >
              Cerrar
            </AlertDialogAction>
            <AlertDialogCancel
              onClick={async () => {
                try {
                  await eliminateUser(id);
                  onDelete(id);
                  toast({
                    variant: 'success',
                    title: 'Usuario eliminado',
                  });
                  setDeleteUser(true);
                  navigate('/gestion-usuarios');
                } catch (error) {
                  toast({
                    variant: 'destructive',
                    title: 'Algo salio mal!',
                    description: `Error al hacer el request: ${error}`,
                  });
                }
              }}
            >
              <Trash2 className="mr-2 h-4 w-4" /> Eliminar
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <EditUserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        userID={id}
        onModify={onModify}
      />
    </Card>
  );
};
