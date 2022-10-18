import React, { memo, useState } from 'react';

import { setUserId } from '../../store/reducers/PacksReducer';
import { useAppDispatch, useAppSelector } from '../../utils/hooks/useSelectorUseDispatch';

import s from './myOrAll.module.scss';

export const MyOrAll = memo(() => {
  const [isMy, setIsMy] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const userId = useAppSelector(state => state.profile._id);

  const getMyPacksHandler = () => {
    dispatch(setUserId(userId));
    setIsMy(true);
  };

  const getAllPacksHandler = () => {
    dispatch(setUserId(''));
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
        >
          My
        </button>
        <button
          onClick={getAllPacksHandler}
          className={isMy ? s.button : [s.button, s.active].join(' ')}
          type="button"
        >
          All
        </button>
      </div>
    </div>
  );
});
