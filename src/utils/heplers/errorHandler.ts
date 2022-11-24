import { setError, setPopUp } from '../../store/reducers/AppReducer';
import { setIsLogin } from '../../store/reducers/AuthReducer';
import { ThunkDispatchType } from '../types/types';

export const errorHandler = (dispatch: ThunkDispatchType, message: string) => {
  if (message === 'you are not authorized /ᐠ-ꞈ-ᐟ\\') {
    dispatch(setIsLogin(false));
  }
  dispatch(setError(true));
  dispatch(setPopUp(message));
};
