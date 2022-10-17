import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { RootStateType } from '../../store/store';
import { ThunkDispatchType } from '../types/types';

export const useAppDispatch: () => ThunkDispatchType = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector;
