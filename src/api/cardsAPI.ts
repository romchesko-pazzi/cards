import { instance } from './instance';

export const cardsAPI = {
  getCards(params: GetParamsType) {
    return instance.get<ResponseCardsType>('/cards/card', {
      params: { ...params },
    });
  },
};

export type GetParamsType = {
  cardsPack_id: string;
};

export type CardType = {
  _id: string;
  cardsPack_id: string;
  user_id: string;
  answer: string;
  question: string;
  updated: string;
  grade: number;
};

export type ResponseCardsType = {
  cards: CardType[];
  cardsTotalCount: number;
  maxGrade: number;
  minGrade: number;
  packUpdated: string;
  packUserId: string;
  packName: string;
};
