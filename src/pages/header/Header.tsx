import React from 'react';

import { useNavigate } from 'react-router-dom';

import { ButtonComponent } from '../../components/button/ButtonComponent';
import { SvgSelector } from '../../components/svgSelector/SvgSelector';
import { useAppSelector } from '../../utils/hooks/useSelectorUseDispatch';

import s from './header.module.scss';

export const Header = () => {
  const navigate = useNavigate();
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);
  const name = useAppSelector(state => state.profile.name);
  const avatar = useAppSelector(state => state.profile.avatar);
  const navigateHandler = () => navigate('/');

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
          <ButtonComponent callback={navigateHandler} type="button" title="Sign in" />
        </div>
      )}
    </div>
  );
};
