import { api } from '@/lib/axios';
import { Presentation, Product, ProductFormData } from './types';

export const getProducts = async (): Promise<Array<Product> | undefined> => {
  try {
    const res = await api.get(`Productos`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getProductByID = async (
  id: number
): Promise<Product | undefined> => {
  try {
    const res = await api.get(`Productos/${id}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const addProduct = async (data: ProductFormData) => {
  const producto = {
    nombre: data.nombre,
    cantidad: data.cantidad,
    costo: data.costo,
  };
  try {
    const res = await api.post(`Productos`, producto);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const modifyProduct = async (
  productID: number,
  data: ProductFormData
) => {
  const producto = {
    nombre: data.nombre,
    cantidad: data.cantidad,
    costo: data.costo,
  };
  try {
    const res = await api.patch(`Productos/${productID}`, producto);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const addProductPresentation = async (
  data: Omit<Presentation, 'productoID' | 'presentacionID'>,
  productID: number
) => {
  const presentacion = {
    color: data.color,
    tamano: data.tamano,
    sku: data.sku,
    imagen: data.imagen,
  };
  try {
    const res = await api.post(
      `Productos/${productID}/presentaciones`,
      presentacion
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteProduct = async (id: number | undefined) => {
  try {
    const res = await api.delete(`Productos/${id}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
