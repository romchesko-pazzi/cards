import { CardType } from '../../api/cardsAPI';

export const values: RatingType[] = [
  { value: 1, label: "Didn't know 1" },
  { value: 2, label: 'Forgot 2' },
  { value: 3, label: 'Doubted 3' },
  { value: 4, label: 'Confused 4' },
  { value: 5, label: 'Knew the answer 5' },
];

export const initRandomCard: CardType = {
  cardsPack_id: '',
  answer: '',
  user_id: '',
  question: '',
  updated: '',
  _id: '',
  grade: 0,
  shots: 0,
};

type RatingType = {
  label: string;
  value: number;
};
