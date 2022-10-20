import React, { useEffect } from 'react';

import { Navigate, Route, Routes } from 'react-router-dom';

import { CheckEmail } from '../pages/checkEmail/CheckEmail';
import { Forgot } from '../pages/forgot/Forgot';
import { Header } from '../pages/header/Header';
import { NewPassword } from '../pages/newPassword/NewPassword';
import { NotFound } from '../pages/notFound/NotFound';
import { PacksList } from '../pages/packsList/PacksList';
import { Profile } from '../pages/profile/Profile';
import { SignIn } from '../pages/signIn/SignIn';
import { SignUp } from '../pages/signUp/SignUp';
import { initializeApp } from '../store/thunks/thunks';
import { path } from '../utils/constants';
import { useAppDispatch, useAppSelector } from '../utils/hooks/useSelectorUseDispatch';

import s from './app.module.scss';

export const App = () => {
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
    <Routes>
      <Route path="/" element={<Header />}>
        <Route index element={<SignIn />} />
        <Route path={path.signUp} element={<SignUp />} />
        <Route path={path.profile} element={<Profile />} />
        <Route path={path.forgot} element={<Forgot />} />
        <Route path={path.checkEmail} element={<CheckEmail />} />
        <Route path={`${path.newPassword}/:token`} element={<NewPassword />} />
        <Route path={path.packsList} element={<PacksList />} />
        <Route path="*" element={<Navigate to="not-found" />} />
      </Route>
      <Route path={path.notFound} element={<NotFound />} />
    </Routes>
  );
};
