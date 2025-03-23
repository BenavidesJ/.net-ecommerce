import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { createUser } from '@/services/user';
import { PrivateLayout } from '@/layout';

const formSchema = z.object({
  correo: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' }),
  tipoUsuario: z.string(),
  nombre: z.string().min(1, { message: 'Name is required' }),
  apellido: z.string().min(1, { message: 'Last name is required' }),
  telefono: z.string().min(1, { message: 'Phone number is required' }),
  direccion: z.string().min(1, { message: 'Address is required' }),
  metodoPagoPreferido: z.string(),
});

type FormData = z.infer<typeof formSchema>;

export function CreacionUsuarios() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      correo: '',
      password: '',
      tipoUsuario: '',
      nombre: '',
      apellido: '',
      telefono: '',
      direccion: '',
      metodoPagoPreferido: '',
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      await createUser(data);

      toast({
        title: 'Usuario creado',
        description: 'Un nuevo usuario ha sido agregado al sistema.',
      });

      navigate('/gestion-usuarios');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Hubo un error agregando al usuario. Intente de nuevo',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PrivateLayout>
      <div className="flex flex-1 items-center justify-center p-4">
        <div className="w-full max-w-3xl rounded-xl bg-white shadow-lg p-8 md:p-12">
          <h1 className="text-2xl font-bold mb-6 text-center">
            Agregar nuevo usuario
          </h1>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Campo de correo */}
              <FormField
                control={form.control}
                name="correo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Correo</FormLabel>
                    <FormControl>
                      <Input placeholder="email@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Campo de contraseña */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Tipo de usuario */}
              <FormField
                control={form.control}
                name="tipoUsuario"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo usuario</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select user type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="admin">Administrador</SelectItem>
                        <SelectItem value="cliente">Cliente</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Otros campos */}
              <FormField
                control={form.control}
                name="nombre"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="apellido"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Apellido</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="telefono"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Teléfono</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="direccion"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dirección</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="metodoPagoPreferido"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Número de tarjeta de pago preferido</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Botón de submit */}
              <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? 'Creando usuario...' : 'Agregar Usuario'}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </PrivateLayout>
  );
}
