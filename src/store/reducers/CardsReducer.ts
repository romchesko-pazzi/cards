import { CardType, ResponseCardsType } from '../../api/cardsAPI';

const initState: ResponseCardsType = {
  cards: [],
  cardsTotalCount: 0,
  maxGrade: 0,
  minGrade: 0,
  packName: '',
  packUpdated: '',
  packUserId: '',
};

export const CardsReducer = (
  state = initState,
  action: CardsActionsType,
): ResponseCardsType => {
  switch (action.type) {
    case 'CARDS/SET-CARDS':
      return { ...state, cards: [...state.cards, ...action.payload.cards] };
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

export type CardsActionsType = SetCardsType;

type SetCardsType = ReturnType<typeof setCards>;
