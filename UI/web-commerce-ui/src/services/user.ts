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

export const eliminateUser = async (id: UserID) => {
  try {
    const res = await api.delete(`Usuarios/${id}`);
    console.log(res.data);
    // return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const modifyUser = async (id: UserID, data: any) => {
  try {
    const res = await api.patch(`Usuarios/${id}`, data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const createUser = async (data: any) => {
  try {
    const res = await api.post(`Usuarios`, data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
