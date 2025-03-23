import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

interface PresentationFormData {
  color: string;
  tamano: string;
  sku: string;
  imagen: File | null;
}

const presentationSchema = z.object({
  color: z.string().min(1, 'El color es obligatorio'),
  tamano: z.string().min(1, 'El tamaño es obligatorio'),
  sku: z.string().min(1, 'El SKU es obligatorio'),
  imagen: z
    .any()
    .refine((file) => file instanceof File, 'Debe subir una imagen válida'),
});

interface PresentationFormProps {
  onSubmit: (data: PresentationFormData) => void;
}

export const PresentationForm: React.FC<PresentationFormProps> = ({
  onSubmit,
}) => {
  const form = useForm<PresentationFormData>({
    resolver: zodResolver(presentationSchema),
    defaultValues: {
      color: '',
      tamano: '',
      sku: '',
      imagen: null,
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="color"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Color</FormLabel>
              <FormControl>
                <Input placeholder="Ingrese el color" {...field} />
              </FormControl>
              <FormDescription>
                El color de la presentación del producto
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tamano"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tamaño</FormLabel>
              <FormControl>
                <Input placeholder="Ingrese el tamaño" {...field} />
              </FormControl>
              <FormDescription>
                El tamaño de la presentación del producto
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="sku"
          render={({ field }) => (
            <FormItem>
              <FormLabel>SKU</FormLabel>
              <FormControl>
                <Input placeholder="Ingrese el SKU" {...field} />
              </FormControl>
              <FormDescription>
                El código SKU (Unidad de Mantenimiento de Stock) de esta
                presentación
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="imagen"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Imagen</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => field.onChange(e.target.files?.[0] || null)}
                />
              </FormControl>
              <FormDescription>
                Suba una imagen para la presentación del producto
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Agregar Presentación</Button>
      </form>
    </Form>
  );
};
