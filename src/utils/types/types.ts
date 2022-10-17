import { ThunkAction, ThunkDispatch } from 'redux-thunk';

import { PackType } from '../../api/packsAPI';
import { AppActionsType } from '../../store/reducers/AppReducer';
import { AuthActionsType } from '../../store/reducers/AuthReducer';
import { PacksActionsType } from '../../store/reducers/PacksReducer';
import { ProfileActionsType } from '../../store/reducers/ProfileReducer';
import { RootStateType } from '../../store/store';

// все типы action для всего app
export type ActionTypeForApp =
  | AppActionsType
  | AuthActionsType
  | ProfileActionsType
  | PacksActionsType;

// типизация для диспатча санок в санках
export type AppThunkType = ThunkAction<void, RootStateType, unknown, ActionTypeForApp>;
export type ThunkDispatchType = ThunkDispatch<RootStateType, unknown, ActionTypeForApp>;

export type AppStatusType = 'idle' | 'loading' | 'successfully' | 'finished';

export type RegistrationType = {
  email: string;
  password: string;
};

export type SignInType = RegistrationType & {
  rememberMe: boolean;
};

export type SignUpType = RegistrationType & {
  confirmation: string;
};

export type UserDataType = {
  name: string;
  email?: string;
  _id?: string;
  avatar: string;
};

export type EditDataUserType = {
  name: string;
  avatar?: string;
};

export type SetNewPasswordType = {
  password: string;
  resetPasswordToken: string;
};

export type SetPacksDataType = {
  cardPacks: PackType[];
  cardPacksTotalCount: number;
};
