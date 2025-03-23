import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { userSchema, UserFormData, TipoUsuario } from '@/lib/userSchema';
import { getUserByID, modifyUser } from '@/services/user';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

interface EditUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  userID: number;
  onModify: (modifiedUser: any) => void;
  isProfilePage?: boolean;
}

export function EditUserModal({
  isOpen,
  onClose,
  userID,
  onModify,
  isProfilePage,
}: EditUserModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [profileImage, setProfileImage] = useState<File | null>(null); // Para manejar la imagen
  const navigate = useNavigate();
  const { toast } = useToast();

  const { control, handleSubmit, reset, setValue } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      nombre: '',
      apellido: '',
      direccion: '',
      telefono: '',
      correo: '',
      metodoPagoPreferido: '',
      tipoUsuario: TipoUsuario.CLIENTE,
    },
  });

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      getUserByID(userID)
        .then((userData) => {
          if (userData) {
            reset(userData);
          }
        })
        .catch((error) => console.error('Error fetching user data:', error))
        .finally(() => setIsLoading(false));
    }
  }, [isOpen, userID, setValue, reset]);

  const onSubmit = async (data: UserFormData) => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append('nombre', data.nombre);
      formData.append('apellido', data.apellido);
      formData.append('direccion', data.direccion);
      formData.append('telefono', data.telefono);
      formData.append('correo', data.correo);
      formData.append('metodoPagoPreferido', data.metodoPagoPreferido);
      formData.append('tipoUsuario', data.tipoUsuario);
      if (profileImage) {
        formData.append('image', profileImage); // Adjuntar la imagen si se seleccionó
      }
      await modifyUser(userID, formData);
      onModify(data);
      toast({
        title: isProfilePage ? 'Perfil actualizado' : 'Usuario modificado',
      });

      !isProfilePage &&
        navigate('/gestion-usuarios', {
          replace: true,
        });

      onClose();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Hubo un error modificando al usuario. Intente de nuevo',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    reset(); // Reinicia el formulario
    onClose(); // Cierra el modal
  };

  // Manejar el cambio de la imagen
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setProfileImage(event.target.files[0]);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="sm:max-w-[425px]"
        aria-describedby="user-modal-description"
      >
        <DialogHeader>
          <DialogTitle>
            {isProfilePage ? 'Perfil de Usuario' : 'Editar Usuario'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {[
            // Los campos del formulario
            'nombre',
            'apellido',
            'direccion',
            'telefono',
            'correo',
            'metodoPagoPreferido',
            'tipoUsuario',
          ].map((field) => (
            <div key={field} className="space-y-2" id="user-modal-description">
              <Label htmlFor={field} className="capitalize">
                {field}
              </Label>
              <Controller
                name={field as keyof UserFormData}
                control={control}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <>
                    <Input
                      id={field}
                      type="text"
                      value={value ?? ''}
                      onChange={(e) => onChange(e.target.value)}
                      className={error ? 'border-red-500' : ''}
                      disabled={!!(field === 'tipoUsuario') && isProfilePage}
                    />
                    {error && (
                      <p className="text-red-500 text-sm">{error.message}</p>
                    )}
                  </>
                )}
              />
            </div>
          ))}

          {isProfilePage && ( // Solo mostrar el input de imagen si estamos en el perfil
            <div className="space-y-2" id="image-upload">
              <Label htmlFor="image">Subir Imagen</Label>
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
          )}

          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading
                ? 'Saving...'
                : isProfilePage
                ? 'Guardar Perfil'
                : 'Guardar Cambios'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
