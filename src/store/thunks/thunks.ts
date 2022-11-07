import { authAPI, repairPasswordAPI } from '../../api/authAPI';
import { cardsAPI, CreateDataType, UpdateCardType } from '../../api/cardsAPI';
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
import { setCards, setCardsTotalCount, setUpdatedCard } from '../reducers/CardsReducer';
import { setIsPacksFetched, setPacks, updatePack } from '../reducers/PacksReducer';
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

      dispatch(setPopUp('name has been changed successfully'));
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
      dispatch(setPopUp('pack has been deleted successfully'));
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
      dispatch(setPopUp('name has been changed successfully'));
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
      await packsAPI.createPack(packName);
      dispatch(getPacks());
      dispatch(setPopUp('pack has been added successfully'));
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
      const { pageCount, cardQuestion, page, sortCards } = getState().cards.queryParams;
      const response = await cardsAPI.getCards({
        cardsPack_id,
        pageCount,
        cardQuestion,
        page,
        sortCards,
      });
      const { cards, cardsTotalCount } = response.data;

      dispatch(setCards(cards));
      dispatch(setCardsTotalCount(cardsTotalCount));
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

      dispatch(setPopUp('card has been added successfully'));
      dispatch(getCards(response.data.newCard.cardsPack_id));
    } catch (err: any) {
      dispatch(setPopUp(err.response.data.error));
    } finally {
      dispatch(setAppStatus('finished'));
    }
  };

export const deleteCard =
  (cardId: string): AppThunkType =>
  async dispatch => {
    dispatch(setAppStatus('loading'));
    try {
      const response = await cardsAPI.deleteCard(cardId);

      dispatch(getCards(response.data.deletedCard.cardsPack_id));
      dispatch(setPopUp('card has been deleted successfully'));
    } catch (err: any) {
      dispatch(setPopUp(err.response.data.error));
    } finally {
      dispatch(setAppStatus('finished'));
    }
  };

export const updateCard =
  (question: string, answer: string, _id: string): AppThunkType =>
  async dispatch => {
    dispatch(setAppStatus('loading'));
    const card: UpdateCardType = { question, answer, _id };

    try {
      const response = await cardsAPI.updateCard(card);

      dispatch(setUpdatedCard(response.data.updatedCard));
      dispatch(setPopUp('card has been updated successfully'));
    } catch (err: any) {
      dispatch(setPopUp(err.response.data.error));
    } finally {
      dispatch(setAppStatus('finished'));
    }
  };
