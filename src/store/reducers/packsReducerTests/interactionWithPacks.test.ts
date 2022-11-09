import { v1 } from 'uuid';

import { PackType } from '../../../api/packsAPI';
import { sortingMethods } from '../../../utils/constants/constants';
import {
  InitStateType,
  PacksReducer,
  removePack,
  setNewPack,
  updatePack,
} from '../PacksReducer';

let startState: InitStateType;
let packId1: string;
let packId2: string;
let packId3: string;

beforeEach(() => {
  packId1 = v1();
  packId2 = v1();
  packId3 = v1();
  startState = {
    cardPacks: [
      {
        _id: packId1,
        user_id: 'USER-ID',
        name: 'A1',
        user_name: 'USER-NAME',
        cardsCount: 0,
        created: 'string',
        updated: 'string',
        grade: 0,
        rating: 0,
        shots: 0,
      },
      {
        _id: packId2,
        user_id: 'USER-ID',
        name: 'B2',
        user_name: 'USER-NAME',
        cardsCount: 0,
        created: 'string',
        updated: 'string',
        grade: 0,
        rating: 0,
        shots: 0,
      },
      {
        _id: packId3,
        user_id: 'USER-ID',
        name: 'C3',
        user_name: 'USER-NAME',
        cardsCount: 0,
        created: 'string',
        updated: 'string',
        grade: 0,
        rating: 0,
        shots: 0,
      },
    ],
    cardPacksTotalCount: 0,
    maxCardsCount: 0,
    minCardsCount: 0,
    isPacksFetched: false,
    queryParams: {
      pageCount: 5,
      page: 1,
      min: 0,
      max: 110,
      user_id: '',
      packName: '',
      sortPacks: sortingMethods.DES_UPDATE,
    },
  };
});

test('correct pack must be deleted', () => {
  const endState = PacksReducer(startState, removePack(packId1));
  const lengthExpect = 2;

  expect(endState.cardPacks.length).toStrictEqual(lengthExpect);
  expect(endState.cardPacks[0].name).toStrictEqual('B2');
  expect(endState.cardPacks.every(item => item._id !== packId1)).toBeTruthy();
});

test('correct packName of correct pack must be changed', () => {
  const testData = '5.5.5.5';
  const endState = PacksReducer(startState, updatePack(packId3, testData));

  expect(endState.cardPacks[2].name).toStrictEqual(testData);
  expect(endState.cardPacks[0].name).toStrictEqual('A1');
  expect(endState.cardPacks[2]._id).toStrictEqual(startState.cardPacks[2]._id);
  expect(endState.cardPacks[2].name).not.toStrictEqual(startState.cardPacks[2].name);
});

test('new pack must be set', () => {
  const testData: PackType = {
    _id: packId1,
    user_id: 'USER-ID',
    name: 'PACK-NAME',
    user_name: 'USER-NAME',
    cardsCount: 0,
    created: '123',
    updated: '123',
    grade: 0,
    rating: 0,
    shots: 0,
  };
  const endStateLength = 4;
  const endState = PacksReducer(startState, setNewPack(testData));

  expect(endState.cardPacks.length).toStrictEqual(endStateLength);
  expect(endState.cardPacks[0].name).toStrictEqual(testData.name);
  expect({ ...endState.queryParams }).toStrictEqual({ ...startState.queryParams });
});
