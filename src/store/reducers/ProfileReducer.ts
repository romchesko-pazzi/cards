import { UserDataType } from '../../utils/types/types';

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

type InitStateType = {
  name: string;
  email: string;
  _id: string;
  avatar: string;
};
export type ProfileActionsType = SetUserDataType;
type SetUserDataType = ReturnType<typeof setUserData>;
