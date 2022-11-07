import { CardType, ResponseGetType, UpdateCardType } from '../../api/cardsAPI';
import { sortingCardsMethods } from '../../utils/constants/constants';

const initState: InitStateType = {
  cards: [],
  cardsTotalCount: 0,
  packName: '',
  queryParams: {
    pageCount: 5,
    page: 1,
    cardQuestion: '',
    sortCards: sortingCardsMethods.DES_UPDATE,
  },
};

export const CardsReducer = (
  state = initState,
  action: CardsActionsType,
): InitStateType => {
  switch (action.type) {
    case 'CARDS/SET-CARDS':
      return { ...state, cards: [...action.payload.cards] };
    case 'CARDS/SET-CARD-QUESTION':
    case 'CARDS/SET-CURRENT-PAGE':
    case 'CARDS/SET-CARDS-PER-PAGE':
    case 'CARDS/SET-SORT-CARD-BY':
      return { ...state, queryParams: { ...state.queryParams, ...action.payload } };
    case 'CARDS/SET-UPDATED-CARD':
      return {
        ...state,
        cards: state.cards.map(m =>
          m._id === action.payload.card._id
            ? {
                ...m,
                question: action.payload.card.question,
                answer: action.payload.card.answer,
              }
            : m,
        ),
      };
    case 'CARDS/SET-CARDS-TOTAL-COUNT':
      return { ...state, ...action.payload };
    default: {
      return state;
    }
  }
};

export const setCards = (cards: CardType[]) => {
  return {
    type: 'CARDS/SET-CARDS',
    payload: { cards },
  } as const;
};

export const setCardQuestion = (cardQuestion: string) => {
  return {
    type: 'CARDS/SET-CARD-QUESTION',
    payload: { cardQuestion },
  } as const;
};

export const setCardsCurrentPage = (page: number) => {
  return {
    type: 'CARDS/SET-CURRENT-PAGE',
    payload: { page },
  } as const;
};

export const setCardsPerPage = (pageCount: number) => {
  return {
    type: 'CARDS/SET-CARDS-PER-PAGE',
    payload: { pageCount },
  } as const;
};

export const setUpdatedCard = (card: UpdateCardType) => {
  return {
    type: 'CARDS/SET-UPDATED-CARD',
    payload: { card },
  } as const;
};

export const setCardsTotalCount = (cardsTotalCount: number) => {
  return {
    type: 'CARDS/SET-CARDS-TOTAL-COUNT',
    payload: { cardsTotalCount },
  } as const;
};

export const setSortCardBy = (sortCards: sortingCardsMethods) => {
  return {
    type: 'CARDS/SET-SORT-CARD-BY',
    payload: { sortCards },
  } as const;
};

export type CardsActionsType =
  | SetCardsType
  | SetCardQuestionType
  | SetCardsCurrentPageType
  | SetCardsPerPageType
  | SetUpdatedCardType
  | SetCardsTotalCountType
  | SetSortCardByType;

type SetCardsType = ReturnType<typeof setCards>;
type SetCardQuestionType = ReturnType<typeof setCardQuestion>;
type SetCardsCurrentPageType = ReturnType<typeof setCardsCurrentPage>;
type SetCardsPerPageType = ReturnType<typeof setCardsPerPage>;
type SetUpdatedCardType = ReturnType<typeof setUpdatedCard>;
type SetCardsTotalCountType = ReturnType<typeof setCardsTotalCount>;
type SetSortCardByType = ReturnType<typeof setSortCardBy>;

export type InitStateType = ResponseGetType & {
  queryParams: {
    pageCount: number;
    page: number;
    cardQuestion: string;
    sortCards: sortingCardsMethods;
  };
};
