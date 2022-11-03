import React from 'react';

import {
  FormControl,
  MenuItem,
  Pagination,
  Select,
  SelectChangeEvent,
} from '@mui/material';

import { setCardsCurrentPage, setCardsPerPage } from '../../store/reducers/CardsReducer';
import { setPacksCurrentPage, setPacksPerPage } from '../../store/reducers/PacksReducer';
import { useAppDispatch } from '../../utils/hooks/useSelectorUseDispatch';

import s from './pagination.module.scss';

export const PaginationComponent = (props: PaginationPropsType) => {
  const { currentPage, pageCount, totalCount, isThisPlaceCards } = props;

  const limit = Math.ceil(totalCount / pageCount);
  const dispatch = useAppDispatch();
  const perPageValue = pageCount.toString();

  const handler = (event: React.ChangeEvent<unknown>, currentPage: number) => {
    if (isThisPlaceCards) dispatch(setCardsCurrentPage(currentPage));
    if (!isThisPlaceCards) dispatch(setPacksCurrentPage(currentPage));
  };

  const perPageHandler = (event: SelectChangeEvent) => {
    const pageCount = +event.target.value;

    if (isThisPlaceCards) dispatch(setCardsPerPage(pageCount));
    if (!isThisPlaceCards) dispatch(setPacksPerPage(pageCount));
  };

  return (
    <div className={s.main}>
      <Pagination onChange={handler} page={currentPage} count={limit} />
      <div className={s.perPage}>
        <div>Show</div>
        <FormControl sx={{ margin: '0 1rem' }} size="small">
          <Select
            sx={{ fontFamily: 'inherit', fontSize: 'inherit' }}
            value={perPageValue}
            onChange={perPageHandler}
          >
            <MenuItem className={s.menuItem} value={5}>
              5
            </MenuItem>
            <MenuItem className={s.menuItem} value={10}>
              10
            </MenuItem>
            <MenuItem className={s.menuItem} value={15}>
              15
            </MenuItem>
          </Select>
        </FormControl>
        <div>packs per page</div>
      </div>
    </div>
  );
};

type PaginationPropsType = {
  pageCount: number;
  totalCount: number;
  currentPage: number;
  isThisPlaceCards: boolean;
};
