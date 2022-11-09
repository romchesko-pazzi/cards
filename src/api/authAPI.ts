import axios from 'axios';

import { message } from '../utils/constants/constants';
import { RegistrationType, SetNewPasswordType, SignInType } from '../utils/types/types';

import { instance } from './instance';

export const authAPI = {
  login(data: SignInType) {
    return instance.post<ResponseType>('/auth/login', data);
  },
  logout() {
    return instance.delete('/auth/me');
  },
  authMe() {
    return instance.post<ResponseType>('/auth/me');
  },
  register(data: RegistrationType) {
    return instance.post('/auth/register', data);
  },
};

export const repairPasswordAPI = {
  sendLetter(email: string) {
    return axios.post<RepairPasswordType>(
      'https://neko-back.herokuapp.com/2.0/auth/forgot',
      { email, message },
      { withCredentials: true },
    );
  },
  setNewPassword(data: SetNewPasswordType) {
    return instance.post<{ info: string }>('/auth/set-new-password', data);
  },
};

type ResponseType = {
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
  avatar: string;
};

type RepairPasswordType = {
  success: boolean;
  info: string;
};
