import { CardType, ResponseCardsType } from '../../api/cardsAPI';

const initState: InitStateType = {
  cards: [],
  cardsTotalCount: 0,
  packName: '',
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
    case 'CARDS/SET-CARD-QUESTION':
      return { ...state, queryParams: { ...state.queryParams, ...action.payload } };
    case 'CARDS/SET-NEW-CARD':
      return { ...state, cards: [action.payload.newCard, ...state.cards] };
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

export const setNewCard = (newCard: CardType) => {
  return {
    type: 'CARDS/SET-NEW-CARD',
    payload: { newCard },
  } as const;
};

export type CardsActionsType = SetCardsType | SetCardQuestionType | SetNewCardType;

type SetCardsType = ReturnType<typeof setCards>;
type SetCardQuestionType = ReturnType<typeof setCardQuestion>;
type SetNewCardType = ReturnType<typeof setNewCard>;

export type InitStateType = ResponseCardsType & {
  queryParams: {
    pageCount: number;
    cardQuestion: string;
  };
};
