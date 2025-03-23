import { api } from '@/lib/axios';

export const addOrder = async (data: any) => {
  try {
    console.log(data);
    const res = await api.post(`Pedidos`, data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const payment = async (data: any) => {
  try {
    const res = await api.post(`Pagos`, data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getOrderByUserID = async (
  id: number | undefined
): Promise<any | undefined> => {
  console.log(id);
  try {
    const res = await api.get(`Pedidos/usuario/${id}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getOrders = async (): Promise<any | undefined> => {
  try {
    const res = await api.get(`Pedidos`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getOrderStatus = async (): Promise<any | undefined> => {
  try {
    const res = await api.get(`EstadoPedido`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const modifyOrder = async (
  data: any,
  orderID: number
): Promise<any | undefined> => {
  try {
    const res = await api.patch(`Pedidos/${orderID}`, data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
