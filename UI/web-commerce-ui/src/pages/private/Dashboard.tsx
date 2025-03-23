import { Product } from '@/components/custom';
import { useAuth } from '@/context';
import { PrivateLayout } from '@/layout';
import { useEffect, useState } from 'react';
import { Product as ProductType } from '@/services/types';
import { getProducts } from '@/services/products';

export const Dashboard = () => {
  const { currentUser, isAdmin } = useAuth();
  const [products, setProducts] = useState<Array<ProductType> | undefined>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      // setLoading(true);
      // setError(null);
      try {
        const fetchedProducts = await getProducts();
        setProducts(fetchedProducts);
      } catch (err) {
        // setError('Error al cargar los productos');
        console.error(err);
      } finally {
        // setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <PrivateLayout>
      <h1>Dashboard, Hola {currentUser && currentUser.correo}</h1>
      <div className="grid auto-rows-min gap-3 md:grid-cols-4 justify-items-center">
        {!isAdmin &&
          products &&
          products.map(
            (product: ProductType) =>
              product.presentaciones.length > 0 && (
                <Product
                  key={product.id}
                  variant="customer"
                  product={product}
                  id={product.id}
                />
              )
          )}
      </div>
    </PrivateLayout>
  );
};
