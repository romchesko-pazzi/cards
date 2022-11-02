import { instance } from './instance';

export const cardsAPI = {
  getCards(params: GetParamsType) {
    return instance.get<ResponseCardsType>('/cards/card', {
      params: { ...params },
    });
  },
  createCard(card: CreateDataType) {
    return instance.post<ResponsePostCard>('/cards/card', { card });
  },
};

export type GetParamsType = {
  cardsPack_id: string;
  pageCount: number;
  cardQuestion: string;
};

export type CreateDataType = {
  cardsPack_id: string;
  question: string;
  answer: string;
};

export type CardType = CreateDataType & {
  _id: string;
  user_id: string;
  updated: string;
  grade: number;
};

export type ResponseCardsType = {
  cards: CardType[];
  cardsTotalCount: number;
  packName: string;
};

export type ResponsePostCard = {
  newCard: CardType;
};
