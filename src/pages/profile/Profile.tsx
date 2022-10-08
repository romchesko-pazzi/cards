import React, { useCallback, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import { ButtonComponent } from '../../components/button/ButtonComponent';
import { EditableSpan } from '../../components/editableSpan/EditableSpan';
import { SnackBar } from '../../components/snackBar/SnackBar';
import { Wrapper } from '../../components/wrapper/Wrapper';
import { changeUserData, logout } from '../../store/thunks/thunks';
import { useAppDispatch, useAppSelector } from '../../utils/hooks/hooks';
import { SvgSelector } from '../../utils/SvgSelector';

import s from './profile.module.scss';

export const Profile = () => {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);
  const name = useAppSelector(state => state.profile.name);
  const email = useAppSelector(state => state.profile.email);
  const avatar = useAppSelector(state => state.profile.avatar);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  const logoutHandler = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  const editName = (name: string) => {
    dispatch(changeUserData({ name }));
  };

  return (
    <Wrapper heading="Personal Information">
      <div className={s.content}>
        <div className={s.photo}>
          {avatar && avatar !== 'https//avatar-url.img' ? (
            <img src={avatar} alt="" />
          ) : (
            <SvgSelector id="user" />
          )}
        </div>
        <div className={s.userData}>
          <EditableSpan callback={editName} name={name} />
        </div>
        <div className={s.mail}>{email}</div>
        <div>
          <ButtonComponent type="submit" callback={logoutHandler} title="Log out" />
        </div>
      </div>
      <SnackBar />
    </Wrapper>
  );
};
