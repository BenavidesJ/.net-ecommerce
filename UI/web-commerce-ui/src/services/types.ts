import { TipoUsuario } from '@/lib/userSchema';

export type Auth = { correo: string; password: string };
export type LoginResponse = { isSuccess: boolean; token: string; id: number };

export type SingleUserResponse = {
  id: number;
  correo: string;
  password: string;
  tipoUsuario?: TipoUsuario;
  nombre?: string;
  apellido?: string;
  telefono?: string;
  direccion?: string;
  metodoPagoPreferido?: string;
};
export interface Presentation {
  productoID: number;
  presentacionID: number;
  color: string;
  tamano: string;
  sku: string;
  imagen: string;
}

export interface Product {
  id: number;
  nombre: string;
  cantidad: number;
  costo: number;
  costoConIVA: number;
  presentaciones: Presentation[];
}

export interface ProductFormData {
  nombre: string;
  cantidad: number;
  costo: number;
}

export interface ProductProps {
  id: number;
  product: Product | undefined;
  variant: 'inventory' | 'customer';
  onDelete?: (id: number | undefined) => void;
}
export type UserID = SingleUserResponse['id'];
