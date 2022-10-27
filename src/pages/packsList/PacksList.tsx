import React, { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import loaderStyles from '../../app/app.module.scss';
import c from '../../assets/commonStyles/common.module.scss';
import { AddModal } from '../../components/modals/addModal/AddModal';
import { MyOrAll } from '../../components/myOrAll/MyOrAll';
import { PaginationComponent } from '../../components/pagination/PaginationComponent';
import { Search } from '../../components/search/Search';
import { SliderComponent } from '../../components/slider/SliderComponent';
import { SnackBar } from '../../components/snackBar/SnackBar';
import { getPacks } from '../../store/thunks/thunks';
import { useAppDispatch, useAppSelector } from '../../utils/hooks/useSelectorUseDispatch';
import { Pack } from '../pack/Pack';

import s from './packsList.module.scss';

export const PacksList = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const packs = useAppSelector(state => state.packs.cardPacks);
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);
  const isPacksFetched = useAppSelector(state => state.packs.isPacksFetched);

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

  if (!isPacksFetched) {
    return (
      <div className={loaderStyles.center}>
        <div className={loaderStyles.loader} />
      </div>
    );
  }

  return (
    <div className={c.frame}>
      <div className={c.heading}>
        <h3>Packs list</h3>
        <AddModal />
      </div>
      <div className={c.settings}>
        <Search />
        <MyOrAll />
        <SliderComponent min={min} max={max} />
      </div>
      {packs.length === 0 ? (
        <div className={s.noData}>No data.</div>
      ) : (
        <>
          <div className={c.table}>
            <div className={c.captions}>
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
                  userId={item.user_id}
                  cardsCount={item.cardsCount}
                  updated={item.updated}
                  author={item.user_name}
                  packId={item._id}
                />
              );
            })}
          </div>
          <PaginationComponent />
        </>
      )}
      <SnackBar />
    </div>
  );
};
