import React, { useEffect } from 'react';

import { LinearProgress } from '@mui/material';
import { Route, Routes } from 'react-router-dom';

import { Header } from '../pages/header/Header';
import { Profile } from '../pages/profile/Profile';
import { SignIn } from '../pages/signIn/SignIn';
import { SignUp } from '../pages/signUp/SignUp';
import { initializeApp } from '../store/reducers/AppReducer';
import { path } from '../utils/constants';
import { useAppDispatch, useAppSelector } from '../utils/hooks/hooks';

import s from './app.module.scss';

export const App = () => {
  const status = useAppSelector(state => state.app.status);
  const isInitialized = useAppSelector(state => state.app.isInitialized);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initializeApp());
  }, [dispatch]);

  if (!isInitialized) {
    return (
      <div className={s.center}>
        <div className={s.loader} />
      </div>
    );
  }

  return (
    <>
      <Header />
      {status === 'loading' ? (
        <LinearProgress />
      ) : (
        <div className={s.transparentLoading} />
      )}
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path={path.SIGNUP} element={<SignUp />} />
        <Route path={path.PROFILE} element={<Profile />} />
      </Routes>
    </>
  );
};
