import { PackType } from '../../api/packsAPI';
import { UserDataType } from '../../utils/types/types';

const initState: PackType = {
  _id: '',
  user_id: '',
  name: '',
  user_name: '',
  cardsCount: 0,
  created: '',
  updated: '',
  grade: 0,
  rating: 0,
  shots: 0,
};

export const PacksReducer = (state = initState, action: PacksActionsType): PackType => {
  switch (action.type) {
    default: {
      return state;
    }
  }
};

export type PacksActionsType = any;
