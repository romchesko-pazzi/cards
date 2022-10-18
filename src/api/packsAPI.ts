import { instance } from './instance';

export const packsAPI = {
  getPacks(params: GetParamsType) {
    return instance.get<ResponsePacksType>('/cards/pack', {
      params: { ...params },
    });
  },
};

export type ResponsePacksType = {
  cardPacks: PackType[];
  cardPacksTotalCount: number;
  maxCardsCount: number;
  minCardsCount: number;
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

export type GetParamsType = {
  page: number;
  pageCount: number;
  packName: string;
  user_id: string;
  min: number;
  max: number;
};
