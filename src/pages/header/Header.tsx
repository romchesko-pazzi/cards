import React from 'react';

import { LinearProgress } from '@mui/material';
import { Outlet, useNavigate } from 'react-router-dom';

import { ButtonComponent } from '../../components/button/ButtonComponent';
import { SvgSelector } from '../../components/svgSelector/SvgSelector';
import { path } from '../../utils/constants/constants';
import { useAppSelector } from '../../utils/hooks/useSelectorUseDispatch';

import s from './header.module.scss';

export const Header = () => {
  const navigate = useNavigate();
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);
  const name = useAppSelector(state => state.profile.name);
  const avatar = useAppSelector(state => state.profile.avatar);
  const navigateToSignIn = () => navigate('/');
  const status = useAppSelector(state => state.app.status);
  const navigateToProfile = () => navigate(path.profile);

  return (
    <>
      {status === 'loading' ? (
        <LinearProgress />
      ) : (
        <div className={s.transparentLoading} />
      )}
      <div className={s.main}>
        <h1 className={s.heading}>Cards</h1>
        {isLoggedIn ? (
          <div className={s.userHeader}>
            <span>{name}</span>
            <div className={s.userPhoto}>
              {avatar && avatar !== 'https//avatar-url.img' ? (
                <button type="button" onClick={navigateToProfile}>
                  <img src={avatar} alt="" />
                </button>
              ) : (
                <button type="button" onClick={navigateToProfile}>
                  <SvgSelector id="user" />
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className={s.userHeader}>
            <ButtonComponent callback={navigateToSignIn} type="button" title="Sign in" />
          </div>
        )}
      </div>
      <Outlet />
    </>
  );
};
