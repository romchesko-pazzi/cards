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
};

export type GetParamsType = {
  cardsPack_id: string;
  pageCount: number;
  cardQuestion: string;
  page: number;
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

export type UpdateCardType = {
  _id: string;
  question: string;
  answer: string;
};

type ResponsePutCard = {
  updatedCard: UpdateCardType & { updated: string };
};
