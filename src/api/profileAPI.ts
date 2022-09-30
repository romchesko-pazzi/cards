import { EditDataUserType } from '../utils/types/types';

import { instance } from './instance';

export const profileAPI = {
  editUserData(data: EditDataUserType) {
    return instance.put<UpdateResponseType>('/auth/me', data);
  },
};

type UpdateResponseType = {
  updatedUser: UpdatedUserType;
};

type UpdatedUserType = {
  _id: string;
  email: string;
  rememberMe: boolean;
  name: string;
  publicCardPacksCount: number;
};
