import { ResponsePacksType } from '../../api/packsAPI';
import { sortingPacksMethods } from '../../utils/constants/sortingMethods';

const initState: InitStateType = {
  cardPacks: [],
  cardPacksTotalCount: 0,
  minCardsCount: 0,
  maxCardsCount: 110,
  isPacksFetched: false, // for loading in PacksList.tsx
  queryParams: {
    pageCount: 5, // how many items on the page
    page: 1, // current page
    min: 0,
    max: 110,
    user_id: '', // only for search user's packs
    packName: '', // for Search.tsx
    sortPacks: sortingPacksMethods.desUpdate,
  },
};

export const PacksReducer = (
  state = initState,
  action: PacksActionsType,
): InitStateType => {
  switch (action.type) {
    case 'PACKS/SET-PACKS':
    case 'PACKS/SET-IS-PACKS-FETCHED':
      return { ...state, ...action.payload };
    case 'PACKS/SET-CURRENT-PAGE':
    case 'PACKS/SET-PACK-NAME':
    case 'PACKS/SET-PACKS-PER-PAGE':
    case 'PACKS/SET-USER-ID':
    case 'PACKS/SET-SORT-PACK-BY':
      return { ...state, queryParams: { ...state.queryParams, ...action.payload } };
    case 'PACKS/UPDATE-PACK-NAME': {
      return {
        ...state,
        cardPacks: state.cardPacks.map(m =>
          m._id === action.payload.packId ? { ...m, name: action.payload.packName } : m,
        ),
      };
    }
    case 'PACKS/SET-ZERO-QUERY':
      return {
        ...state,
        minCardsCount: 0,
        maxCardsCount: 110,
        queryParams: { ...state.queryParams, ...action.payload },
      };
    case 'PACKS/SET-SLIDER-VALUE':
      // без проверки идёт лишний запрос
      if (
        action.payload.max !== state.maxCardsCount ||
        action.payload.min !== state.minCardsCount
      ) {
        return { ...state, queryParams: { ...state.queryParams, ...action.payload } };
      }

      return state;
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

export const setPacksCurrentPage = (page: number) => {
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

export const updatePack = (packId: string, packName: string) => {
  return {
    type: 'PACKS/UPDATE-PACK-NAME',
    payload: { packId, packName },
  } as const;
};

export const setSortPackBy = (sortPacks: sortingPacksMethods) => {
  return {
    type: 'PACKS/SET-SORT-PACK-BY',
    payload: { sortPacks },
  } as const;
};

export const setZeroQuery = (queryParams: InitStateType['queryParams']) => {
  return {
    type: 'PACKS/SET-ZERO-QUERY',
    payload: { ...queryParams },
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
  | UpdatePackNameType
  | SetSortPackByType
  | SetZeroQueryType;

type SetPacksType = ReturnType<typeof setPacks>;
type SetCurrentPageType = ReturnType<typeof setPacksCurrentPage>;
type SetPackNameType = ReturnType<typeof setPackName>;
type SetPacksPerPage = ReturnType<typeof setPacksPerPage>;
type SetUserIdType = ReturnType<typeof setUserId>;
type SetSliderValue = ReturnType<typeof setSliderValue>;
type SetIsPacksFetched = ReturnType<typeof setIsPacksFetched>;
type UpdatePackNameType = ReturnType<typeof updatePack>;
type SetSortPackByType = ReturnType<typeof setSortPackBy>;
type SetZeroQueryType = ReturnType<typeof setZeroQuery>;

export type InitStateType = ResponsePacksType & {
  isPacksFetched: boolean;
  queryParams: {
    user_id: string;
    packName: string;
    pageCount: number;
    page: number;
    min: number;
    max: number;
    sortPacks: sortingPacksMethods;
  };
};
