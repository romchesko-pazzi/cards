import { PackType, ResponsePacksType } from '../../api/packsAPI';

const initState: initStateType = {
  cardPacks: [],
  cardPacksTotalCount: 0,
  maxCardsCount: 0,
  minCardsCount: 0,
  isPacksFetched: false, // for loading in PacksList.tsx
  queryParams: {
    pageCount: 5,
    page: 1,
    min: 0,
    max: 110,
    user_id: '',
    packName: '',
  },
};

export const PacksReducer = (
  state = initState,
  action: PacksActionsType,
): initStateType => {
  switch (action.type) {
    case 'PACKS/SET-PACKS':
    case 'PACKS/SET-IS-PACKS-FETCHED':
      return { ...state, ...action.payload };
    case 'PACKS/SET-CURRENT-PAGE':
    case 'PACKS/SET-PACK-NAME':
    case 'PACKS/SET-PACKS-PER-PAGE':
    case 'PACKS/SET-USER-ID':
    case 'PACKS/SET-SLIDER-VALUE':
      return { ...state, queryParams: { ...state.queryParams, ...action.payload } };
    case 'PACKS/DELETE-PACK':
      return {
        ...state,
        cardPacks: state.cardPacks.filter(f => f._id !== action.payload.packId),
      };
    default: {
      return state;
    }
  }
};

export const setPacks = (data: ResponsePacksType) => {
  return {
    type: 'PACKS/SET-PACKS',
    payload: { ...data },
  } as const;
};

export const setCurrentPage = (page: number) => {
  return {
    type: 'PACKS/SET-CURRENT-PAGE',
    payload: { page },
  } as const;
};

export const setPacksPerPage = (pageCount: number) => {
  return {
    type: 'PACKS/SET-PACKS-PER-PAGE',
    payload: { pageCount },
  } as const;
};

export const setPackName = (packName: string) => {
  return {
    type: 'PACKS/SET-PACK-NAME',
    payload: { packName },
  } as const;
};

export const setUserId = (user_id: string) => {
  return {
    type: 'PACKS/SET-USER-ID',
    payload: { user_id },
  } as const;
};

export const setSliderValue = (sliderValue: number[]) => {
  return {
    type: 'PACKS/SET-SLIDER-VALUE',
    payload: { min: sliderValue[0], max: sliderValue[1] },
  } as const;
};

export const setIsPacksFetched = (isPacksFetched: boolean) => {
  return {
    type: 'PACKS/SET-IS-PACKS-FETCHED',
    payload: { isPacksFetched },
  } as const;
};

export const removePack = (packId: string) => {
  return {
    type: 'PACKS/DELETE-PACK',
    payload: { packId },
  } as const;
};

export type PacksActionsType =
  | SetPacksType
  | SetCurrentPageType
  | SetPackNameType
  | SetPacksPerPage
  | SetUserIdType
  | SetSliderValue
  | SetIsPacksFetched
  | RemovePackType;

type SetPacksType = ReturnType<typeof setPacks>;
type SetCurrentPageType = ReturnType<typeof setCurrentPage>;
type SetPackNameType = ReturnType<typeof setPackName>;
type SetPacksPerPage = ReturnType<typeof setPacksPerPage>;
type SetUserIdType = ReturnType<typeof setUserId>;
type SetSliderValue = ReturnType<typeof setSliderValue>;
type SetIsPacksFetched = ReturnType<typeof setIsPacksFetched>;
type RemovePackType = ReturnType<typeof removePack>;

type initStateType = {
  cardPacks: PackType[];
  cardPacksTotalCount: number;
  maxCardsCount: number;
  minCardsCount: number;
  isPacksFetched: boolean;
  queryParams: {
    user_id: string;
    packName: string;
    pageCount: number;
    page: number;
    min: number;
    max: number;
  };
};
