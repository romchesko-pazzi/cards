import { profileAPI } from '../../api/profileAPI';
import { AppThunkType, EditDataUserType, UserDataType } from '../../utils/types/types';

const initState: InitStateType = {
  name: '',
  email: '',
  _id: '',
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
    const response = await profileAPI.editUserData(data);
    const { name, email, _id } = response.data.updatedUser;

    dispatch(setUserData({ name, _id, email }));
  };

type InitStateType = {
  name: string;
  email: string;
  _id: string;
};
export type ProfileActionsType = SetUserDataType;
type SetUserDataType = ReturnType<typeof setUserData>;
