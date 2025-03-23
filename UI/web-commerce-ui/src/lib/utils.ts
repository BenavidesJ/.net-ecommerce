import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const generatePageNameFromPath = (pathname: string) => {
  switch (pathname) {
    case '/dashboard':
      return 'Dashboard';
    case '/gestion-usuarios':
      return 'Gestion de Usuarios - Creacion, Modificacion o Eliminacion de Usuarios del Sistema';
    case '/gestion-usuarios/agregar':
      return 'Gestion de Usuarios - Agregar un usuario';
    case '/gestion-productos':
      return 'Gestion de Productos - Agregar, Modificar Inventario';
    case '/compras':
      return 'Carrito de Compras';
  }
};

export const getInitials = (
  id: number | null | undefined,
  name: string | null | undefined,
  lastname: string | null | undefined
): string => {
  if (!name && !lastname) {
    return `U-${id}`;
  }
  return `${name?.charAt(0)}${lastname?.charAt(0)}`.toUpperCase();
};
