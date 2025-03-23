import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trash2 } from 'lucide-react';
import { PrivateLayout } from '@/layout';
import { useAuth } from '@/context';
import { useNavigate } from 'react-router';

export const ShoppingCart = () => {
  const {
    items,
    removeItem,
    updateQuantity,
    clearCart,
    totalPrice,
    setCheckout,
  } = useCart();
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  return (
    <PrivateLayout>
      <div className="container mx-auto p-4">
        {items.length === 0 ? (
          <div>
            <h3 className="text-lg font-medium">Su carrito esta vacio</h3>
            <img
              src="https://res.cloudinary.com/dh7qptl2n/image/upload/v1733679384/pato_cart_quv2wb.webp"
              alt="carro vacio"
              className="mt-2 w-[280px] h-[400px]"
            />
          </div>
        ) : (
          <>
            <ul className="divide-y divide-gray-200">
              {items.map((item, index) => (
                <li
                  key={`${item.id}-${index}`}
                  className="py-4 flex justify-between items-center"
                >
                  <div>
                    <h3 className="text-lg font-medium">{item.nombre}</h3>
                    <h4 className="text-md font-medium">Presentacion</h4>
                    <p>
                      <strong>Color:</strong> {item.presentaciones.color}
                    </p>
                    <p>
                      <strong>Size:</strong> {item.presentaciones.tamano}
                    </p>
                    <p>
                      <strong>SKU:</strong> {item.presentaciones.sku}
                    </p>
                    <img
                      src={item.presentaciones.imagen}
                      alt={`${item.presentaciones.color} ${item.presentaciones.tamano}`}
                      className="mt-2 w-20 h-20 object-cover"
                    />
                    <h4 className="text-md font-medium">
                      Costo unitario (IVA incluido) ₡
                      {item.costoConIVA.toFixed(2)}
                    </h4>
                  </div>
                  <div className="flex items-center">
                    <Input
                      type="number"
                      min="1"
                      value={item.cantidad}
                      onChange={(e) =>
                        updateQuantity(item.id, parseInt(e.target.value))
                      }
                      className="w-16 mr-2"
                    />
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => removeItem(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex justify-between items-center">
              <p className="text-xl font-bold">
                Total: ₡{totalPrice.toFixed(2)}
              </p>
              <div>
                <Button
                  variant="destructive"
                  onClick={clearCart}
                  className="mr-2"
                >
                  Limpiar el Carrito
                </Button>
                <Button
                  onClick={() => {
                    setCheckout({
                      usuarioID: currentUser?.id,
                      estadoID: 1,
                      montoTotal: totalPrice.toFixed(2),
                      fechaCreacion: new Date().toISOString(),
                      productos: items.map((item) => ({
                        id: item.id,
                        nombre: item.nombre,
                        color: item.presentaciones.color,
                        tamano: item.presentaciones.tamano,
                        costoConIVA: item.costoConIVA,
                      })),
                    });

                    navigate('/checkout', { replace: true });
                  }}
                >
                  Hacer Pedido
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </PrivateLayout>
  );
};
