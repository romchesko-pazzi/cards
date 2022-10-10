import { instance } from './instance';

export const packsAPI = {
  getPacks() {
    return instance.get<ResponsePacksType>('/cards/pack');
  },
};

type ResponsePacksType = {
  cardPacks: PackType[];
  cardPacksTotalCount: number;
  maxCardsCount: number;
  minCardsCount: number;
  page: number;
  pageCount: number;
};

export type PackType = {
  _id: string;
  user_id: string;
  name: string;
  user_name: string;
  cardsCount: number;
  created: string;
  updated: string;
  grade: number;
  rating: number;
  shots: number;
};
