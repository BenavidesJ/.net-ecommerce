import { z } from 'zod';

export const productSchema = z.object({
  nombre: z.string().min(1, 'El nombre es requerido.').trim(),
  cantidad: z.number().nonnegative('Por favor ingrese solo numeros positivos'),
  costo: z.number().nonnegative('Por favor ingrese solo numeros positivos'),
});

export type ProductFormData = z.infer<typeof productSchema>;
