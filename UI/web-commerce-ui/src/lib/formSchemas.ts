import { z } from 'zod';

const email = z
  .string()
  .email({
    message: 'Ingrese un correo valido por favor.',
  })
  .nonempty('El correo es requerido.');

const password = z.string().min(6, {
  message: 'El password debe ser de 6 caracteres de longitud.',
});

export const loginSchema = z.object({
  email,
  password,
});

export const registerSchema = z
  .object({
    email,
    password,
    confirmPassword: password,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Los password no coinciden',
    path: ['confirmPassword'],
  });

export type LoginFormValues = z.infer<typeof loginSchema>;
export type RegisterFormValues = z.infer<typeof registerSchema>;
