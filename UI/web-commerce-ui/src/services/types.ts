export type Auth = { correo: string; password: string };
export type LoginResponse = { isSuccess: boolean; token: string; id: number };

export type SingleUserResponse = {
  id: number;
  correo: string;
  password: string;
  tipoUsuario?: string;
  nombre?: string;
  apellido?: string;
  telefono?: string;
  direccion?: string;
  metodoPagoPreferido?: string;
};
export type UserID = SingleUserResponse['id'];
