import React from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '../ui/button';
import { Edit, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router';

interface UserData {
  id: number;
  name?: string | null;
  lastname?: string | null;
  address: string | null | undefined;
  email: string | null;
  phone: string | null | undefined;
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
}) => {
  const initials = getInitials(id, name, lastname);
  const nav = useNavigate();

  return (
    <Card className="w-full max-w-md mx-auto">
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
            <dt className="font-semibold">Address:</dt>
            <dd>{address || 'Por favor ingrese la informacion'}</dd>
          </div>
          <div>
            <dt className="font-semibold">Email:</dt>
            <dd>{email || 'Por favor ingrese la informacion'}</dd>
          </div>
          <div>
            <dt className="font-semibold">Phone:</dt>
            <dd>{phone || 'Por favor ingrese la informacion'}</dd>
          </div>
        </dl>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          variant="destructive"
          className="bg-red-600 text-white hover:bg-red-700"
          onClick={() => nav(`/delete/${id}`)}
        >
          <Trash2 className="mr-2 h-4 w-4" /> Delete
        </Button>
        <Button
          className="bg-blue-600 text-white hover:bg-blue-700"
          onClick={() => nav(`/modify/${id}`)}
        >
          <Edit className="mr-2 h-4 w-4" /> Modify
        </Button>
      </CardFooter>
    </Card>
  );
};
