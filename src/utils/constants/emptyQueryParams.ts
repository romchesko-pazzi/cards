import { InitStateType } from '../../store/reducers/PacksReducer';

import { sortingPacksMethods } from './sortingMethods';

export const emptyQueryParams: InitStateType['queryParams'] = {
  pageCount: 5,
  sortPacks: sortingPacksMethods.desUpdate,
  user_id: '',
  packName: '',
  min: 0,
  max: 110,
  page: 1,
};
