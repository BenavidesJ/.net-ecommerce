import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTheme } from '@/context/ThemeContext';
import { PrivateLayout } from '@/layout';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { getOrders, getOrderStatus, modifyOrder } from '@/services/order';

export const GestionPedidos = () => {
  const [orders, setOrders] = useState<any[]>([]);

  const [statuses, setStatuses] = useState<any[]>([]);
  const { theme } = useTheme();

  useEffect(() => {
    const fetchOrdersAndStatuses = async () => {
      try {
        const ordersResponse = await getOrders();
        setOrders(
          ordersResponse.sort((a: any, b: any) => b.estadoID - a.estadoID)
        );

        const statusesResponse = await getOrderStatus();
        setStatuses(statusesResponse);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchOrdersAndStatuses();
  }, []);

  const updateOrderStatus = async (orderId: number, newStatusId: number) => {
    try {
      await modifyOrder(
        {
          estadoID: newStatusId,
        },
        orderId
      );
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, estadoID: newStatusId } : order
        )
      );
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

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
        <h1 className="text-2xl font-bold mb-4">Gestión de Pedidos</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {orders.map((order: any) => (
            <Card key={order.id} className="w-full">
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>Orden #{order.id} - </span>
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
                  }`}
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
                <div className="mt-4">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm">
                        Cambiar Estado
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {statuses.map((status: any) => (
                        <DropdownMenuItem
                          key={status.id}
                          onClick={() => updateOrderStatus(order.id, status.id)}
                        >
                          {status.descripcionEstado}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </PrivateLayout>
  );
};
