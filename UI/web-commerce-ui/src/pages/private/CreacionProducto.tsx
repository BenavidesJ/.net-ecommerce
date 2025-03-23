import { PrivateLayout } from '@/layout';
import { ProductForm } from '@/components/custom/ProductForm';
import { addProduct } from '@/services/products';
import { ProductFormData } from '@/services/types';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router';
import { useState } from 'react';

export function CreacionProducto() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = async (data: ProductFormData) => {
    setIsSubmitting(true);
    try {
      await addProduct(data);
      toast({
        title: 'Producto creado',
        description: 'Un nuevo producto ha sido agregado al sistema.',
      });
      navigate('/gestion-productos');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Hubo un error agregando el producto. Intente de nuevo',
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
            Agregar nuevo producto
          </h1>
          <ProductForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
        </div>
      </div>
    </PrivateLayout>
  );
}
