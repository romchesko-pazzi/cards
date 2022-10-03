import React from 'react';

import { ButtonComponent } from '../../components/button/ButtonComponent';
import { useAppSelector } from '../../utils/hooks/hooks';
import { SvgSelector } from '../../utils/SvgSelector';

import s from './header.module.scss';

export const Header = () => {
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);
  const name = useAppSelector(state => state.profile.name);
  const avatar = useAppSelector(state => state.profile.avatar);

  return (
    <div className={s.main}>
      <h1 className={s.heading}>Cards</h1>
      {isLoggedIn ? (
        <div className={s.userHeader}>
          <span>{name}</span>
          <div className={s.userPhoto}>
            {avatar && avatar !== 'https//avatar-url.img' ? (
              <img src={avatar} alt="" />
            ) : (
              <SvgSelector id="user" />
            )}{' '}
          </div>
        </div>
      ) : (
        <div className={s.userHeader}>
          <ButtonComponent type="submit" title="Sign in" />
        </div>
      )}
    </div>
  );
};
