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
import { productSchema, ProductFormData } from '@/lib/productSchema';
import { getProductByID, modifyProduct } from '@/services/products';
import { useToast } from '@/hooks/use-toast';

interface EditProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  productID: number;
  onModify: (modifiedProduct: any) => void;
}

export function EditProductModal({
  isOpen,
  onClose,
  productID,
  onModify,
}: EditProductModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const { control, handleSubmit, reset } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      nombre: '',
      cantidad: 0,
      costo: 0,
    },
  });

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      getProductByID(productID)
        .then((productData) => {
          if (productData) {
            reset(productData);
          }
        })
        .catch((error) => console.error('Error fetching product data:', error))
        .finally(() => setIsLoading(false));
    }
  }, [isOpen, productID, reset]);

  const onSubmit = async (data: ProductFormData) => {
    try {
      setIsLoading(true);
      await modifyProduct(productID, data);
      onModify(data);
      toast({ title: 'Producto modificado con éxito', variant: 'success' });
      onClose();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Hubo un error modificando el producto. Intente de nuevo',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    reset();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="sm:max-w-[425px]"
        aria-describedby="product-modal-description"
      >
        <DialogHeader>
          <DialogTitle>Editar Producto</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {['nombre', 'cantidad', 'costo'].map((field) => (
            <div
              key={field}
              className="space-y-2"
              id="product-modal-description"
            >
              <Label htmlFor={field} className="capitalize">
                {field}
              </Label>
              <Controller
                name={field as keyof ProductFormData}
                control={control}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <>
                    <Input
                      id={field}
                      type={
                        field === 'cantidad' || field === 'costo'
                          ? 'number'
                          : 'text'
                      }
                      value={value ?? ''}
                      onChange={(e) =>
                        onChange(
                          field === 'cantidad' || field === 'costo'
                            ? +e.target.value
                            : e.target.value
                        )
                      }
                      className={error ? 'border-red-500' : ''}
                    />
                    {error && (
                      <p className="text-red-500 text-sm">{error.message}</p>
                    )}
                  </>
                )}
              />
            </div>
          ))}

          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleCancel}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Guardando...' : 'Guardar Cambios'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
