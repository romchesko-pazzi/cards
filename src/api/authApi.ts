import { LoginDataType } from '../utils/types/types';

import { instance } from './instance';

export const authApi = {
  login(data: LoginDataType) {
    return instance.post<LoginResponseType>('/auth/login', data);
  },
  logout() {
    return instance.delete('/auth/me');
  },
  authMe() {
    return instance.post('/auth/me');
  },
};

type LoginResponseType = {
  _id: string;
  email: string;
  rememberMe: boolean;
  isAdmin: boolean;
  name: string;
  verified: boolean;
  publicCardPacksCount: number;
  created: string;
  updated: string;
  __v: number;
  token: string;
  tokenDeathTime: number;
};
