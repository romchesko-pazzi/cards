import { CardType } from '../../api/cardsAPI';

export const getRandomCard = (cards: CardType[]) => {
  const total = 6;
  const sum = cards.reduce(
    (acc, card) => acc + (total - card.grade) * (total - card.grade),
    0,
  );
  const rand = Math.random() * sum;
  const res = cards.reduce(
    (acc: { sum: number; id: number }, card, i) => {
      const newSum = acc.sum + (total - card.grade) * (total - card.grade);

      return { sum: newSum, id: newSum < rand ? i : acc.id };
    },
    { sum: 0, id: -1 },
  );

  return cards[res.id + 1];
};
