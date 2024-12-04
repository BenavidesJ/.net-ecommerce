import { api } from '@/lib/axios';
import { SingleUserResponse, UserID } from './types';

export const getUserByID = async (
  id: UserID
): Promise<SingleUserResponse | undefined> => {
  try {
    const res = await api.get(`Usuarios/${id}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getUsers = async (): Promise<
  Array<SingleUserResponse> | undefined
> => {
  try {
    const res = await api.get(`Usuarios`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
