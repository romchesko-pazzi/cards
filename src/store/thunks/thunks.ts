import { authAPI, repairPasswordAPI } from '../../api/authAPI';
import { GetParamsType, packsAPI } from '../../api/packsAPI';
import { profileAPI } from '../../api/profileAPI';
import {
  AppThunkType,
  EditDataUserType,
  RegistrationType,
  SetNewPasswordType,
  SignInType,
} from '../../utils/types/types';
import { initApp, setAppStatus, setError, setPopUp } from '../reducers/AppReducer';
import { sentEmail, setIsLogin, setPassword } from '../reducers/AuthReducer';
import { setCurrentPage, setPacks } from '../reducers/PacksReducer';
import { setUserData } from '../reducers/ProfileReducer';

export const forgot =
  (email: string): AppThunkType =>
  async dispatch => {
    dispatch(setAppStatus('loading'));
    try {
      const resp = await repairPasswordAPI.sendLetter(email);

      dispatch(setUserData({ email, avatar: '', name: '' }));
      dispatch(setPopUp(resp.data.info));
      dispatch(sentEmail(true));
    } catch (err: any) {
      dispatch(setPopUp(err.message));
      dispatch(setError(true));
    } finally {
      dispatch(setAppStatus('finished'));
    }
  };

export const signUp =
  (data: RegistrationType): AppThunkType =>
  async dispatch => {
    dispatch(setAppStatus('loading'));
    try {
      await authAPI.register(data);
      dispatch(setAppStatus('successfully'));
      dispatch(setPopUp('registration was successful'));
    } catch (err: any) {
      dispatch(setPopUp(err.response.data.error));
      dispatch(setAppStatus('idle'));
    }
  };

export const login =
  (loginData: SignInType): AppThunkType =>
  async dispatch => {
    dispatch(setAppStatus('loading'));
    try {
      const response = await authAPI.login(loginData);
      const { name, _id, email, avatar } = response.data;

      dispatch(setError(false));
      dispatch(setUserData({ name, _id, email, avatar }));
      dispatch(setIsLogin(true));
      dispatch(setPopUp('logging was successful'));
    } catch (err: any) {
      dispatch(setPopUp(err.response.data.error));
      dispatch(setError(true));
    } finally {
      dispatch(setAppStatus('finished'));
    }
  };

export const logout = (): AppThunkType => async dispatch => {
  dispatch(setAppStatus('loading'));
  try {
    await authAPI.logout();
    dispatch(setIsLogin(false));
    dispatch(setPopUp('you logged out successfully'));
  } catch (err: any) {
    dispatch(setPopUp(err.response.data.error));
  } finally {
    dispatch(setAppStatus('finished'));
  }
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

export const setNewPassword =
  (data: SetNewPasswordType): AppThunkType =>
  async dispatch => {
    dispatch(setAppStatus('loading'));
    try {
      const response = await repairPasswordAPI.setNewPassword(data);

      dispatch(setPopUp(response.data.info));
      dispatch(setPassword(true));
    } catch (err: any) {
      dispatch(setPopUp(err.response.data.error));
    } finally {
      dispatch(setAppStatus('finished'));
    }
  };

export const getPacks =
  (params: GetParamsType): AppThunkType =>
  async dispatch => {
    dispatch(setAppStatus('loading'));
    try {
      const response = await packsAPI.getPacks({ ...params });
      const { cardPacks, cardPacksTotalCount, page, pageCount } = response.data;
      const { packName } = params;

      dispatch(setPacks({ cardPacks, cardPacksTotalCount, pageCount, packName }));
      dispatch(setCurrentPage(page));
    } catch (err: any) {
      dispatch(setPopUp(err.response.data.error));
    } finally {
      dispatch(setAppStatus('finished'));
    }
  };
