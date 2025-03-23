import React, { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Edit,
  Minus,
  Plus,
  ShoppingCart,
  Trash2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ProductProps, Presentation } from '@/services/types';
import { useNavigate } from 'react-router';
import { deleteProduct } from '@/services/products';
import { useToast } from '@/hooks/use-toast';
import { EditProductModal } from './EditProductModal';
import { useCart } from '@/context/CartContext';

export const Product: React.FC<ProductProps> = ({
  id,
  product,
  variant,
  onDelete,
}) => {
  const [currentPresentation, setCurrentPresentation] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addItem } = useCart();
  const nav = useNavigate();
  const { toast } = useToast();

  const nextPresentation = () => {
    setCurrentPresentation((prev) =>
      product ? (prev + 1) % product.presentaciones.length : 0
    );
  };

  const prevPresentation = () => {
    setCurrentPresentation((prev) =>
      product
        ? (prev - 1 + product.presentaciones.length) %
          product.presentaciones.length
        : 1
    );
  };

  const renderPresentation = (presentation?: Presentation) => (
    <div className="flex flex-col items-center">
      <img
        src={presentation?.imagen}
        alt={product?.nombre}
        className="w-full h-48 object-cover mb-2"
      />
      <p className="text-sm text-gray-600">
        {presentation?.color} - {presentation?.tamano}
      </p>
    </div>
  );

  const renderNoPresentations = () => (
    <div className="flex flex-col items-center">
      <div className="flex flex-col items-center justify-center h-48 w-full border border-gray-300 rounded bg-gray-100 p-6 text-center mb-2">
        <p className="text-gray-600 mb-4">
          El producto aún no tiene presentaciones
        </p>
        <Button
          className="bg-blue-500 text-white hover:bg-blue-600"
          onClick={() =>
            nav('/gestion-productos/agregar/presentaciones', {
              replace: true,
              state: product?.id,
            })
          }
        >
          Crear Presentación
        </Button>
      </div>
      <p className="text-sm text-gray-600">No hay presentaciones</p>
    </div>
  );

  const renderInventoryVariant = () => (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>{product?.nombre}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          {product?.presentaciones && product?.presentaciones.length > 0
            ? renderPresentation(product?.presentaciones[currentPresentation])
            : renderNoPresentations()}
        </div>

        <div className="flex justify-between items-center mb-2">
          <Button
            size="icon"
            variant="outline"
            onClick={prevPresentation}
            disabled={
              !(product?.presentaciones && product?.presentaciones.length > 0)
            }
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span>
            {currentPresentation + 1} / {product?.presentaciones.length}
          </span>
          <Button
            size="icon"
            variant="outline"
            onClick={nextPresentation}
            disabled={
              !(product?.presentaciones && product?.presentaciones.length > 0)
            }
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-2">
          <p>
            <strong>Cantidad:</strong> {product?.cantidad}
          </p>
          <p>
            <strong>Costo:</strong> ₡{product?.costo.toFixed(2)}
          </p>
          <p>
            <strong>Costo con IVA:</strong> ₡{product?.costoConIVA.toFixed(2)}
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          variant="destructive"
          className="bg-red-600 text-white hover:bg-red-700"
          onClick={async () => {
            const id = product && product.id;
            await deleteProduct(id);
            onDelete && onDelete(id);
            toast({
              variant: 'success',
              title: 'Producto eliminado',
            });
          }}
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

      <EditProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onModify={() => {}}
        productID={id}
      />
    </Card>
  );

  const renderCustomerVariant = () => (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>{product?.nombre}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          {product?.presentaciones && product?.presentaciones.length > 0
            ? renderPresentation(product?.presentaciones[currentPresentation])
            : renderNoPresentations()}
        </div>
        {product?.presentaciones && product?.presentaciones.length > 0 && (
          <div className="flex justify-between items-center mb-4">
            <Button size="icon" variant="outline" onClick={prevPresentation}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span>
              {currentPresentation + 1} / {product?.presentaciones.length}
            </span>
            <Button size="icon" variant="outline" onClick={nextPresentation}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
        <p className="text-xl font-bold mb-4">
          ₡{product?.costoConIVA.toFixed(2)}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button
              size="icon"
              variant="outline"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span>{quantity}</span>
            <Button
              size="icon"
              variant="outline"
              onClick={() => setQuantity(quantity + 1)}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          onClick={() =>
            addItem(
              {
                id: product?.id!,
                cantidad: quantity,
                nombre: product?.nombre!,
                costoConIVA: product?.costoConIVA!,
                costo: product?.costo!,
                presentaciones: product?.presentaciones[currentPresentation],
              },
              quantity
            )
          }
        >
          <ShoppingCart className="mr-2 h-4 w-4" /> Agregar al Carrito
        </Button>
      </CardFooter>
    </Card>
  );

  return variant === 'inventory'
    ? renderInventoryVariant()
    : renderCustomerVariant();
};
