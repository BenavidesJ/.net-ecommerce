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
  }
};
