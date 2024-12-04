import { api } from '@/lib/axios';
import { Auth, LoginResponse } from './types';

export const login = async ({
  correo,
  password,
}: Auth): Promise<LoginResponse | undefined> => {
  try {
    const res = await api.post('Auth/login', { correo, password });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const register = async ({ correo, password }: Auth) => {
  try {
    const data = await api.post('Auth/registro', { correo, password });
    return data;
  } catch (error) {
    console.log(error);
  }
};
