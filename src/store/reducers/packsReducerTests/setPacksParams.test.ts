import { v1 } from 'uuid';

import { ResponsePacksType } from '../../../api/packsAPI';
import {
  initStateType,
  PacksReducer,
  setCurrentPage,
  setIsPacksFetched,
  setPackName,
  setPacks,
  setPacksPerPage,
  setSliderValue,
  setUserId,
} from '../PacksReducer';

let startState: initStateType;
let packId1: string;
let packId2: string;

beforeEach(() => {
  startState = {
    cardPacks: [],
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
    },
  };
  packId1 = v1();
  packId2 = v1();
});

test('packs must be set', () => {
  const data: ResponsePacksType = {
    cardPacksTotalCount: 25,
    minCardsCount: 44,
    maxCardsCount: 111,
    cardPacks: [
      {
        _id: packId1,
        user_id: 'pazziId',
        name: 'A1',
        user_name: 'pazzi',
        cardsCount: 0,
        created: 'string',
        updated: 'string',
        grade: 0,
        rating: 0,
        shots: 0,
      },
      {
        _id: packId2,
        user_id: 'pazziId',
        name: 'B2',
        user_name: 'pazzi',
        cardsCount: 0,
        created: 'string',
        updated: 'string',
        grade: 0,
        rating: 0,
        shots: 0,
      },
    ],
  };
  const { minCardsCount, maxCardsCount, cardPacksTotalCount } = data;
  const length = 2;
  const endState = PacksReducer(startState, setPacks(data));

  expect(endState.minCardsCount).toStrictEqual(minCardsCount);
  expect(endState.maxCardsCount).toStrictEqual(maxCardsCount);
  expect(endState.cardPacksTotalCount).toStrictEqual(cardPacksTotalCount);
  expect(endState.cardPacks[0].name).toStrictEqual('A1');
  expect(endState.cardPacks.length).toStrictEqual(length);
});

test('packs must be fetched', () => {
  const endState = PacksReducer(startState, setIsPacksFetched(true));

  expect(endState.isPacksFetched).toBeTruthy();
  expect({ ...endState.queryParams }).toStrictEqual({ ...startState.queryParams });
});

test('current page must be set', () => {
  const testData = 86;
  const endState = PacksReducer(startState, setCurrentPage(testData));

  expect(endState.queryParams.page).toEqual(testData);
});

test('packName must be set', () => {
  const endState = PacksReducer(startState, setPackName('newPackName'));

  expect(endState.queryParams.packName).toStrictEqual('newPackName');
  expect(startState.queryParams.packName).not.toStrictEqual('newPackName');
});

test('number of packs on the page must be...', () => {
  const testData = 86;
  const endState = PacksReducer(startState, setPacksPerPage(testData));

  expect(endState.queryParams.pageCount).toStrictEqual(testData);
  expect(startState.queryParams.pageCount).not.toStrictEqual(testData);
  expect(endState.queryParams.page).toStrictEqual(startState.queryParams.page);
});

test('userId must be set', () => {
  const testData = v1();
  const endState = PacksReducer(startState, setUserId(testData));

  expect(endState.queryParams.user_id).toStrictEqual(testData);
  expect(startState.queryParams.user_id).not.toStrictEqual(testData);
});

test('slider value must be set', () => {
  const min = 56;
  const max = 96;
  const endState = PacksReducer(startState, setSliderValue([min, max]));

  expect(endState.queryParams.min).toStrictEqual(min);
  expect(endState.queryParams.max).toStrictEqual(max);
  expect(endState.queryParams.max).not.toStrictEqual(min);
  expect(endState.queryParams.min).not.toStrictEqual(max);
  expect(startState.queryParams.min).not.toStrictEqual(min);
  expect(startState.queryParams.max).not.toStrictEqual(max);
});
