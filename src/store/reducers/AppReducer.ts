import { authAPI } from '../../api/authAPI';
import { AppStatusType, AppThunkType } from '../../utils/types/types';

import { setIsLogin } from './AuthReducer';
import { setUserData } from './ProfileReducer';

const initState: InitStateType = {
  status: 'idle',
  isInitialized: false,
  notification: '',
};

export const AppReducer = (state = initState, action: AppActionsType): InitStateType => {
  switch (action.type) {
    case 'APP/SET-APP-STATUS':
    case 'APP/SET-ERROR':
      return { ...state, ...action.payload };
    case 'APP/INIT-APP':
      return { ...state, isInitialized: true };
    default: {
      return state;
    }
  }
};

export const setAppStatus = (status: AppStatusType) => {
  return {
    type: 'APP/SET-APP-STATUS',
    payload: { status },
  } as const;
};

export const setError = (notification: string) => {
  return {
    type: 'APP/SET-ERROR',
    payload: { notification },
  } as const;
};

export const initApp = () => {
  return {
    type: 'APP/INIT-APP',
  } as const;
};

export const initializeApp = (): AppThunkType => async dispatch => {
  try {
    const response = await authAPI.authMe();
    const { name, _id, email, avatar } = response.data;

    dispatch(setUserData({ name, _id, email, avatar }));
    dispatch(setIsLogin(true));
  } catch (err: any) {
    return;
  } finally {
    dispatch(initApp());
  }
};

type InitStateType = {
  status: AppStatusType;
  isInitialized: boolean;
  notification: string;
};
export type AppActionsType = SetAppStatusType | InitAppType | SetErrorType;

type SetAppStatusType = ReturnType<typeof setAppStatus>;
type InitAppType = ReturnType<typeof initApp>;
type SetErrorType = ReturnType<typeof setError>;
