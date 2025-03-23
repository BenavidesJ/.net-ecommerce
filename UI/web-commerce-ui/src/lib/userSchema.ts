import { z } from 'zod';

export enum TipoUsuario {
  ADMIN = 'admin',
  CLIENTE = 'cliente',
}

export const userSchema = z.object({
  nombre: z.string().min(1, 'El nombre es requerido.').trim(),
  apellido: z.string().min(1, 'E apellido es requerido.').trim(),
  direccion: z.string().min(1, 'La direccion es requerida.').trim(),
  telefono: z.string().min(1, 'El numero de telefono es requerido.').trim(),
  correo: z.string().email('El formato del correo es incorrecto.').trim(),
  metodoPagoPreferido: z
    .string()
    .min(10, 'El formato de la tarjeta es incorrecto')
    .trim(),
  tipoUsuario: z.enum([TipoUsuario.ADMIN, TipoUsuario.CLIENTE], {
    errorMap: () => ({
      message: 'El tipo de usuario debe ser "admin" o "cliente".',
    }),
  }),
});

export type UserFormData = z.infer<typeof userSchema>;
