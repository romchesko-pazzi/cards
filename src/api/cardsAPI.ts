import { sortingCardsMethods } from '../utils/constants/sortingMethods';

import { instance } from './instance';

export const cardsAPI = {
  getCards(params: GetParamsType) {
    return instance.get<ResponseGetType>('/cards/card', {
      params: { ...params },
    });
  },
  createCard(card: CreateDataType) {
    return instance.post<ResponsePostCard>('/cards/card', { card });
  },
  deleteCard(cardId: string) {
    return instance.delete<ResponseDeleteCard>(`/cards/card?id=${cardId}`);
  },
  updateCard(card: UpdateCardType) {
    return instance.put<ResponsePutCard>('/cards/card', { card });
  },
  rateCard(card: RateCardType) {
    return instance.put<ResponseRateCardType>('/cards/grade', card);
  },
};

export type GetParamsType = {
  cardsPack_id: string;
  pageCount: number;
  cardQuestion: string;
  page: number;
  sortCards: sortingCardsMethods;
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
  shots: number; // for attempts count
};

export type ResponseGetType = {
  cards: CardType[];
  cardsTotalCount: number;
  packName: string;
};

export type ResponsePostCard = {
  newCard: CardType;
};

type ResponseDeleteCard = {
  deletedCard: { cardsPack_id: string };
};

type ResponsePutCard = {
  updatedCard: UpdateCardType & { updated: string };
};

type ResponseRateCardType = {
  updatedGrade: RateCardType & {
    shots: number;
    cardsPack_id: string;
  };
};

export type UpdateCardType = {
  _id: string;
  question: string;
  answer: string;
};

export type RateCardType = {
  grade: number;
  card_id: string;
};
