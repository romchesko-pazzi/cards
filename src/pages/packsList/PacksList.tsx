import React, { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import c from '../../assets/commonStyles/common.module.scss';
import { Captions } from '../../components/captions/Captions';
import { AddModal } from '../../components/modals/addModal/AddModal';
import { MyOrAll } from '../../components/myOrAll/MyOrAll';
import { PaginationComponent } from '../../components/pagination/PaginationComponent';
import { Search } from '../../components/search/Search';
import { SliderComponent } from '../../components/slider/SliderComponent';
import { SnackBar } from '../../components/snackBar/SnackBar';
import { SvgSelector } from '../../components/svgSelector/SvgSelector';
import { setZeroQuery } from '../../store/reducers/PacksReducer';
import { getPacks } from '../../store/thunks/thunks';
import { packsCaptions } from '../../utils/constants/captions';
import { emptyQueryParams } from '../../utils/constants/emptyQueryParams';
import { useAppDispatch, useAppSelector } from '../../utils/hooks/useSelectorUseDispatch';
import { Pack } from '../pack/Pack';

import s from './packsList.module.scss';

export const PacksList = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);
  const packs = useAppSelector(state => state.packs.cardPacks);
  const isPacksFetched = useAppSelector(state => state.packs.isPacksFetched);
  const totalCount = useAppSelector(state => state.packs.cardPacksTotalCount);

  // dependencies for request (query params)
  const page = useAppSelector(state => state.packs.queryParams.page);
  const pageCount = useAppSelector(state => state.packs.queryParams.pageCount);
  const user_id = useAppSelector(state => state.packs.queryParams.user_id);
  const packName = useAppSelector(state => state.packs.queryParams.packName);
  const minQueryParam = useAppSelector(state => state.packs.queryParams.min);
  const maxQueryParam = useAppSelector(state => state.packs.queryParams.max);
  const sortBy = useAppSelector(state => state.packs.queryParams.sortPacks);

  useEffect(() => {
    dispatch(getPacks());
  }, [
    dispatch,
    page,
    packName,
    pageCount,
    user_id,
    minQueryParam,
    maxQueryParam,
    sortBy,
  ]);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  if (!isPacksFetched) {
    return (
      <div className={c.center}>
        <div className={c.loader} />
      </div>
    );
  }

  const refreshFilters = () => {
    dispatch(setZeroQuery(emptyQueryParams));
  };

  return (
    <div className={c.frame}>
      <div className={c.heading}>
        <h3>Packs list</h3>
        <AddModal isThisPlaceCards={false} />
      </div>
      <div className={c.settings}>
        <Search isThisPlaceCards={false} />
        <MyOrAll />
        <SliderComponent />
        <button className={s.refreshButton} type="button" onClick={refreshFilters}>
          <SvgSelector id="refresh" />
        </button>
      </div>
      {packs.length === 0 ? (
        <div className={s.noData}>No data.</div>
      ) : (
        <>
          <div className={c.table}>
            <Captions isThisPlaceCards={false} captions={packsCaptions} />
            {packs.map(item => {
              return (
                <Pack
                  key={item._id}
                  packName={item.name}
                  userId={item.user_id}
                  cardsTotalCount={item.cardsCount}
                  updated={item.updated}
                  author={item.user_name}
                  packId={item._id}
                />
              );
            })}
          </div>
          <PaginationComponent
            isThisPlaceCards={false}
            pageCount={pageCount}
            currentPage={page}
            totalCount={totalCount}
          />
        </>
      )}
      <SnackBar />
    </div>
  );
};
