import React, { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import { ButtonComponent } from '../../components/button/ButtonComponent';
import { MyOrAll } from '../../components/myOrAll/MyOrAll';
import { PaginationComponent } from '../../components/pagination/PaginationComponent';
import { Search } from '../../components/search/Search';
import { SliderComponent } from '../../components/slider/SliderComponent';
import { getPacks } from '../../store/thunks/thunks';
import { useAppDispatch, useAppSelector } from '../../utils/hooks/useSelectorUseDispatch';
import { Pack } from '../pack/Pack';

import s from './packsList.module.scss';

export const PacksList = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const packs = useAppSelector(state => state.packs.cardPacks);
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);

  // dependencies for request (query params)
  const page = useAppSelector(state => state.packs.queryParams.page);
  const pageCount = useAppSelector(state => state.packs.queryParams.pageCount);
  const user_id = useAppSelector(state => state.packs.queryParams.user_id);
  const packName = useAppSelector(state => state.packs.queryParams.packName);
  const min = useAppSelector(state => state.packs.queryParams.min);
  const max = useAppSelector(state => state.packs.queryParams.max);

  useEffect(() => {
    dispatch(getPacks());
  }, [dispatch, page, packName, pageCount, user_id, min, max]);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className={s.frame}>
      <div className={s.heading}>
        <h3>Packs list</h3>
        <div>
          <ButtonComponent title="Add new pack" />
        </div>{' '}
      </div>
      <div className={s.settings}>
        <Search />
        <MyOrAll />
        <SliderComponent min={min} max={max} />
      </div>
      <div className={s.table}>
        <div className={s.captions}>
          <div>Name</div>
          <div>Cards</div>
          <div>Last Updated</div>
          <div>Created by</div>
          <div>Actions</div>
        </div>
        {packs.map(item => {
          return (
            <Pack
              key={item._id}
              packName={item.name}
              cardsCount={item.cardsCount}
              updated={item.updated}
              author={item.user_name}
            />
          );
        })}
      </div>
      <PaginationComponent />
    </div>
  );
};
