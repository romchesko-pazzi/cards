import { profileAPI } from '../../api/profileAPI';
import { AppThunkType, EditDataUserType, UserDataType } from '../../utils/types/types';

import { setAppStatus, setPopUp } from './AppReducer';

const initState: InitStateType = {
  name: '',
  email: '',
  _id: '',
  avatar: '',
};

export const ProfileReducer = (
  state = initState,
  action: ProfileActionsType,
): InitStateType => {
  switch (action.type) {
    case 'PROFILE/SET-USER-DATA':
      return { ...state, ...action.payload.data };
    default: {
      return state;
    }
  }
};

export const setUserData = (data: UserDataType) => {
  return {
    type: 'PROFILE/SET-USER-DATA',
    payload: { data },
  } as const;
};

export const changeUserData =
  (data: EditDataUserType): AppThunkType =>
  async dispatch => {
    dispatch(setAppStatus('loading'));
    try {
      const response = await profileAPI.editUserData(data);
      const { name, email, _id, avatar } = response.data.updatedUser;

      dispatch(setPopUp('name changed successfully'));
      dispatch(setUserData({ name, _id, email, avatar }));
    } catch (err: any) {
      dispatch(setPopUp(err.response.data.error));
    } finally {
      dispatch(setAppStatus('idle'));
    }
  };

type InitStateType = {
  name: string;
  email: string;
  _id: string;
  avatar: string;
};
export type ProfileActionsType = SetUserDataType;
type SetUserDataType = ReturnType<typeof setUserData>;
