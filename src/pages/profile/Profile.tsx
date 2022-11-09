import React, { useCallback, useEffect } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import { ButtonComponent } from '../../components/button/ButtonComponent';
import { EditableSpan } from '../../components/editableSpan/EditableSpan';
import { SnackBar } from '../../components/snackBar/SnackBar';
import { SvgSelector } from '../../components/svgSelector/SvgSelector';
import { Wrapper } from '../../components/wrapper/Wrapper';
import { changeUserData, logout } from '../../store/thunks/thunks';
import { path } from '../../utils/constants/constants';
import { useAppDispatch, useAppSelector } from '../../utils/hooks/useSelectorUseDispatch';

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
        <div>
          <Link to={path.packsList}>Go to packs</Link>
        </div>
        <div>{email}</div>
        <div>
          <ButtonComponent type="submit" callback={logoutHandler} title="Log out" />
        </div>
      </div>
      <SnackBar />
    </Wrapper>
  );
};
