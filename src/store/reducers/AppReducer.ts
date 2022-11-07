import { AppStatusType } from '../../utils/types/types';

const initState: InitStateType = {
  status: 'idle',
  isInitialized: false,
  notification: '',
  isError: false,
};

export const AppReducer = (state = initState, action: AppActionsType): InitStateType => {
  switch (action.type) {
    case 'APP/SET-APP-STATUS':
    case 'APP/SET-POP-UP':
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

export const setPopUp = (notification: string = 'some error') => {
  return {
    type: 'APP/SET-POP-UP',
    payload: { notification },
  } as const;
};

export const initApp = () => {
  return {
    type: 'APP/INIT-APP',
  } as const;
};

export const setError = (isError: boolean) => {
  return {
    type: 'APP/SET-ERROR',
    payload: { isError },
  } as const;
};

type InitStateType = {
  status: AppStatusType;
  isInitialized: boolean;
  notification: string;
  isError: boolean;
};
export type AppActionsType = SetAppStatusType | InitAppType | SetErrorType | SetPopUpType;

type SetAppStatusType = ReturnType<typeof setAppStatus>;
type InitAppType = ReturnType<typeof initApp>;
type SetErrorType = ReturnType<typeof setError>;
type SetPopUpType = ReturnType<typeof setPopUp>;
