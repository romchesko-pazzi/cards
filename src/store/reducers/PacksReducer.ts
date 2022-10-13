import { PackType } from '../../api/packsAPI';
import { SetPacksInitialType } from '../../utils/types/types';

const initState: initStateType = {
  cardPacks: [],
  cardPacksTotalCount: 0,
  pageCount: 5,
  page: 1,
};

export const PacksReducer = (
  state = initState,
  action: PacksActionsType,
): initStateType => {
  switch (action.type) {
    case 'PACKS/SET-PACKS': {
      return { ...state, ...action.payload.initData };
    }
    case 'PACKS/SET-CURRENT-PAGE': {
      return { ...state, ...action.payload };
    }
    default: {
      return state;
    }
  }
};

export const setPacks = (initData: SetPacksInitialType) => {
  return {
    type: 'PACKS/SET-PACKS',
    payload: { initData },
  } as const;
};

export const setCurrentPage = (page: number) => {
  return {
    type: 'PACKS/SET-CURRENT-PAGE',
    payload: { page },
  } as const;
};

export type PacksActionsType = SetPacksType | SetCurrentPageType;
type SetPacksType = ReturnType<typeof setPacks>;
type SetCurrentPageType = ReturnType<typeof setCurrentPage>;

type initStateType = {
  cardPacks: PackType[];
  cardPacksTotalCount: number;
  pageCount: number;
  page: number;
};
