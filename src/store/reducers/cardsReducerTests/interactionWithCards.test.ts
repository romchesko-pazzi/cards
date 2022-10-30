import { v1 } from 'uuid';

import { CardsReducer, setCards } from '../CardsReducer';

let startState: any;

beforeEach(() => {
  startState = {
    cards: [],
    cardsTotalCount: 0,
    maxGrade: 0,
    minGrade: 0,
    packName: '',
    packUpdated: '',
    packUserId: '',
    queryParams: {
      pageCount: 5,
    },
  };
});

test('cards must be set', () => {
  const resultLength = 3;
  const data: any = {
    cardsTotalCount: 22,
    packName: 'english',
    maxGrade: 10,
    minGrade: 3,
    packUserId: 'userId123',
    packUpdated: '28.10.22',
    cards: [
      {
        _id: v1(),
        answer: 'sick',
        cardsPack_id: '631a0347cb617100044dc0a8',
        grade: 0,
        question: 'больной',
        updated: '2022-09-12T18:08:30.127Z',
        user_id: '62b95afbc89f323f541531d1',
      },
      {
        _id: v1(),
        answer: 'sick',
        cardsPack_id: '631a0347cb617100044dc0a8',
        grade: 0,
        question: 'how is it called',
        updated: '2022-09-12T18:08:30.127Z',
        user_id: '62b95afbc89f323f541531d1',
      },
      {
        _id: v1(),
        answer: 'sick',
        cardsPack_id: '631a0347cb617100044dc0a8',
        grade: 0,
        question: 'what',
        updated: '2022-09-12T18:08:30.127Z',
        user_id: '62b95afbc89f323f541531d1',
      },
    ],
  };
  const endState = CardsReducer(startState, setCards(data.cards));

  expect(endState.cards.length).toStrictEqual(resultLength);
  expect(startState.cards.length).toStrictEqual(0);
});
