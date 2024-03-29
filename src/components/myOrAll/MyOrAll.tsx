import React, { memo, useEffect, useState } from 'react';

import { setUserId, setZeroQuery } from '../../store/reducers/PacksReducer';
import { emptyQueryParams } from '../../utils/constants/emptyQueryParams';
import { useAppDispatch, useAppSelector } from '../../utils/hooks/useSelectorUseDispatch';

import s from './myOrAll.module.scss';

export const MyOrAll = memo(() => {
  const appStatus = useAppSelector(state => state.app.status);
  const idForRefreshFilter = useAppSelector(state => state.packs.queryParams.user_id);
  const [isMy, setIsMy] = useState<boolean>(!!idForRefreshFilter);
  const dispatch = useAppDispatch();
  const userId = useAppSelector(state => state.profile._id);

  useEffect(() => {
    if (!idForRefreshFilter) {
      setIsMy(false);
    }
  }, [idForRefreshFilter]);

  const getMyPacksHandler = () => {
    dispatch(setZeroQuery(emptyQueryParams));
    dispatch(setUserId(userId));
    setIsMy(true);
  };

  const getAllPacksHandler = () => {
    dispatch(setZeroQuery(emptyQueryParams));
    setIsMy(false);
  };

  return (
    <div className={s.main}>
      <span>Show packs cards</span>
      <div className={s.buttons}>
        <button
          onClick={getMyPacksHandler}
          className={isMy ? [s.button, s.active].join(' ') : s.button}
          type="button"
          disabled={appStatus === 'loading'}
        >
          My
        </button>
        <button
          onClick={getAllPacksHandler}
          className={isMy ? s.button : [s.button, s.active].join(' ')}
          type="button"
          disabled={appStatus === 'loading'}
        >
          All
        </button>
      </div>
    </div>
  );
});
