import { authAPI, repairPasswordAPI } from '../../api/authAPI';
import { cardsAPI, CreateDataType } from '../../api/cardsAPI';
import { packsAPI } from '../../api/packsAPI';
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
import { setCards, setNewCard } from '../reducers/CardsReducer';
import {
  removePack,
  setIsPacksFetched,
  setNewPack,
  setPacks,
  updatePack,
} from '../reducers/PacksReducer';
import { setUserData } from '../reducers/ProfileReducer';
import { RootStateType } from '../store';

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
  (): AppThunkType => async (dispatch, getState: () => RootStateType) => {
    dispatch(setAppStatus('loading'));
    try {
      const { page, pageCount, user_id, packName, min, max, sortPacks } =
        getState().packs.queryParams;

      const response = await packsAPI.getPacks({
        page,
        pageCount,
        user_id,
        packName,
        min,
        max,
        sortPacks,
      });
      const { cardPacks, cardPacksTotalCount, minCardsCount, maxCardsCount } =
        response.data;

      dispatch(
        setPacks({ cardPacks, cardPacksTotalCount, minCardsCount, maxCardsCount }),
      );
      dispatch(setIsPacksFetched(true));
    } catch (err: any) {
      dispatch(setPopUp(err.response.data.error));
      dispatch(setIsLogin(false));
    } finally {
      dispatch(setAppStatus('finished'));
    }
  };

export const deletePack =
  (packId: string): AppThunkType =>
  async dispatch => {
    dispatch(setAppStatus('loading'));
    try {
      await packsAPI.deletePack(packId);
      dispatch(removePack(packId));
      dispatch(setPopUp('pack have been deleted successfully'));
      dispatch(getPacks());
    } catch (err: any) {
      dispatch(setPopUp(err.response.data.error));
    } finally {
      dispatch(setAppStatus('finished'));
    }
  };

export const updatePackName =
  (packId: string, packName: string): AppThunkType =>
  async dispatch => {
    dispatch(setAppStatus('loading'));
    try {
      const response = await packsAPI.updatePack(packId, packName);

      dispatch(updatePack(packId, response.data.updatedCardsPack.name));
      dispatch(setPopUp('name have been changed successfully'));
    } catch (err: any) {
      dispatch(setPopUp(err.response.data.error));
    } finally {
      dispatch(setAppStatus('finished'));
    }
  };

export const createPack =
  (packName: string): AppThunkType =>
  async dispatch => {
    dispatch(setAppStatus('loading'));
    try {
      const response = await packsAPI.createPack(packName);

      dispatch(setNewPack(response.data.newCardsPack));
      dispatch(setPopUp('pack have been added successfully'));
    } catch (err: any) {
      dispatch(setPopUp(err.response.data.error));
    } finally {
      dispatch(setAppStatus('finished'));
    }
  };

export const getCards =
  (cardsPack_id: string): AppThunkType =>
  async (dispatch, getState: () => RootStateType) => {
    dispatch(setAppStatus('loading'));
    try {
      const { pageCount, cardQuestion } = getState().cards.queryParams;
      const response = await cardsAPI.getCards({
        cardsPack_id,
        pageCount,
        cardQuestion,
      });
      const { cards } = response.data;

      dispatch(setCards(cards));
    } catch (err: any) {
      dispatch(setPopUp(err.response.data.error));
      dispatch(setIsLogin(false));
    } finally {
      dispatch(setAppStatus('finished'));
    }
  };

export const createCard =
  (card: CreateDataType): AppThunkType =>
  async dispatch => {
    dispatch(setAppStatus('loading'));
    try {
      const response = await cardsAPI.createCard(card);

      dispatch(setNewCard(response.data.newCard));
      dispatch(setPopUp('card have been added successfully'));
    } catch (err: any) {
      dispatch(setPopUp(err.response.data.error));
    } finally {
      dispatch(setAppStatus('finished'));
    }
  };
