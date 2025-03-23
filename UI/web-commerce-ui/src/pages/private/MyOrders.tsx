import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/context';
import { useTheme } from '@/context/ThemeContext';
import { PrivateLayout } from '@/layout';
import { getOrderByUserID } from '@/services/order';
import axios from 'axios';
import { useEffect, useState } from 'react';

export const MyOrders = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [statuses, setStatuses] = useState<any[]>([]);
  const { currentUser } = useAuth();
  const { theme } = useTheme();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const ID = currentUser?.id;
        console.log(ID);
        if (ID) {
          const ordersResponse = await getOrderByUserID(currentUser?.id);

          setOrders(ordersResponse);
        }

        const statusesResponse = await axios.get<any[]>(
          'https://localhost:7005/api/EstadoPedido'
        );
        setStatuses(statusesResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchOrders();
  }, []);

  const getStatusName = (statusId: number) => {
    const status = statuses.find((s: any) => s.id === statusId);

    return status ? status.descripcionEstado : 'Desconocido';
  };

  const getStatusColor = (statusId: number) => {
    switch (statusId) {
      case 1:
        return 'bg-red-500';
      case 2:
        return 'bg-blue-500';
      case 3:
        return 'bg-purple-500';
      case 4:
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <PrivateLayout>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Órdenes</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {orders.map((order: any) => (
            <Card key={order.id} className="w-full">
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>Orden #{order.id}</span>
                  <Badge
                    className={`${getStatusColor(order.estadoID)} text-white`}
                  >
                    {getStatusName(order.estadoID)}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p
                  className={`${
                    theme === 'dark'
                      ? 'font-semibold text-yellow-500 mb-2'
                      : 'font-semibold text-purple-600 mb-2'
                  } `}
                >
                  Fecha: {new Date(order.fechaCreacion).toLocaleString()}
                </p>
                <p className="font-semibold mb-2">
                  Total: ${order.montoTotal.toFixed(2)}
                </p>
                <h3 className="font-semibold mb-1">Productos:</h3>
                <ul className="list-disc list-inside">
                  {order.productos.map((product: any, index: any) => (
                    <li key={`${product.id}-${index}`} className="text-sm">
                      {product.nombre} - {product.color}, {product.tamano}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </PrivateLayout>
  );
};
