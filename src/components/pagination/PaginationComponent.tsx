import React from 'react';

import { Pagination } from '@mui/material';

import { getPacks } from '../../store/thunks/thunks';
import { useAppDispatch, useAppSelector } from '../../utils/hooks/hooks';

import s from './pagination.module.scss';

export const PaginationComponent = () => {
  const pageCount = useAppSelector(state => state.packs.pageCount);
  const cardPacksTotalCount = useAppSelector(state => state.packs.cardPacksTotalCount);
  const currentPage = useAppSelector(state => state.packs.page);
  const limit = Math.ceil(cardPacksTotalCount / pageCount);
  const dispatch = useAppDispatch();

  const handler = (n: any, num: number) => {
    dispatch(getPacks({ num }));
  };

  return (
    <div className={s.main}>
      <Pagination onChange={handler} page={currentPage} count={limit} />
    </div>
  );
};
