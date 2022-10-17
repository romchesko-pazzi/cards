import React from 'react';

import {
  FormControl,
  MenuItem,
  Pagination,
  Select,
  SelectChangeEvent,
} from '@mui/material';

import { getPacks } from '../../store/thunks/thunks';
import { useAppDispatch, useAppSelector } from '../../utils/hooks/useSelectorUseDispatch';

import s from './pagination.module.scss';

export const PaginationComponent = () => {
  const pageCount = useAppSelector(state => state.packs.pageCount);
  const cardPacksTotalCount = useAppSelector(state => state.packs.cardPacksTotalCount);
  const currentPage = useAppSelector(state => state.packs.page);
  const packName = useAppSelector(state => state.packs.packName);
  const limit = Math.ceil(cardPacksTotalCount / pageCount);
  const dispatch = useAppDispatch();
  const perPageValue = pageCount.toString();

  const handler = (event: React.ChangeEvent<unknown>, currentPage: number) => {
    dispatch(getPacks({ page: currentPage, pageCount, packName }));
  };

  const perPageHandler = (event: SelectChangeEvent) => {
    const pageCount = +event.target.value;

    dispatch(getPacks({ page: currentPage, pageCount, packName }));
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
