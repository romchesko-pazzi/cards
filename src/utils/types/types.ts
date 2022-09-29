import { ThunkAction, ThunkDispatch } from 'redux-thunk';

import { AppActionsType } from '../../store/reducers/AppReducer';
import { AuthActionsType } from '../../store/reducers/AuthReducer';
import { ProfileActionsType } from '../../store/reducers/ProfileReducer';
import { RootStateType } from '../../store/store';

// все типы action для всего app
export type ActionTypeForApp = AppActionsType | AuthActionsType | ProfileActionsType;

// типизация для диспатча санок в санках
export type AppThunkType = ThunkAction<void, RootStateType, unknown, ActionTypeForApp>;
export type ThunkDispatchType = ThunkDispatch<RootStateType, unknown, ActionTypeForApp>;

export type AppStatusType = 'idle' | 'loading' | 'successfully' | 'finished';

export type LoginDataType = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export type UserDataType = {
  name: string;
  email: string;
  _id: string;
};
