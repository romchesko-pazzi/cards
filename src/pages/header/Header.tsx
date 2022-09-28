import React from 'react';

import { ButtonComponent } from '../../components/button/ButtonComponent';
import { useAppSelector } from '../../utils/hooks/hooks';

import s from './Header.module.scss';

export const Header = () => {
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);

  return (
    <div className={s.main}>
      <h1 className={s.heading}>Cards</h1>
      {isLoggedIn ? (
        <div className={s.userHeader}>
          <span>Name</span>
          <img src="" alt="" />
        </div>
      ) : (
        <div className={s.button}>
          <ButtonComponent title="Sign in" />
        </div>
      )}
    </div>
  );
};
