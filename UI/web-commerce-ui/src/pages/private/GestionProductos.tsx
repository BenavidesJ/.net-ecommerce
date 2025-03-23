import { Product } from '@/components/custom';
import { Button } from '@/components/ui/button';
import { PrivateLayout } from '@/layout';
import { getProducts } from '@/services/products';
import { Product as ProductType } from '@/services/types';
import { PlusCircleIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

export const GestionProductos = () => {
  const nav = useNavigate();
  const [products, setProducts] = useState<Array<ProductType> | undefined>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleProductDeleted = (id: number | undefined) => {
    setProducts((prev) => prev && prev.filter((prod) => prod.id !== id));
  };

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const fetchedProducts = await getProducts();
        setProducts(fetchedProducts);
      } catch (err) {
        setError('Error al cargar los productos');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <PrivateLayout>
      <div className="grid grid-cols-1 px-3 py-3 justify-items-center">
        <Button
          onClick={() => nav('/gestion-productos/agregar', { replace: true })}
          className="bg-green-500 text-white text-lg flex items-center gap-2 px-4 py-2 rounded hover:bg-green-600"
        >
          <PlusCircleIcon className="h-6 w-6" />
          Crear Producto
        </Button>
      </div>
      <div className="grid auto-rows-min gap-3 md:grid-cols-4 justify-items-center">
        {products && products.length > 0 ? (
          products.map((product: ProductType) => (
            <Product
              key={product.id}
              variant="inventory"
              product={product}
              onDelete={handleProductDeleted}
              id={product.id}
            />
          ))
        ) : (
          <p>No hay productos disponibles.</p>
        )}
      </div>
    </PrivateLayout>
  );
};
