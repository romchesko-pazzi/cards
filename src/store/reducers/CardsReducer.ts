import { CardType, ResponseCardsType } from '../../api/cardsAPI';

const initState: InitStateType = {
  cards: [],
  cardsTotalCount: 0,
  // maxGrade: 0,
  // minGrade: 0,
  packName: '',
  // packUpdated: '',
  // packUserId: '',
  queryParams: {
    pageCount: 5,
    cardQuestion: '',
  },
};

export const CardsReducer = (
  state = initState,
  action: CardsActionsType,
): InitStateType => {
  switch (action.type) {
    case 'CARDS/SET-CARDS':
      return { ...state, cards: [...action.payload.cards] };
    case 'PACKS/SET-CARD-QUESTION':
      return { ...state, queryParams: { ...state.queryParams, ...action.payload } };
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
    type: 'PACKS/SET-CARD-QUESTION',
    payload: { cardQuestion },
  } as const;
};

export type CardsActionsType = SetCardsType | SetCardQuestion;

type SetCardsType = ReturnType<typeof setCards>;
type SetCardQuestion = ReturnType<typeof setCardQuestion>;

export type InitStateType = ResponseCardsType & {
  queryParams: {
    pageCount: number;
    cardQuestion: string;
  };
};
