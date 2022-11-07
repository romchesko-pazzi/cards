import React, { useEffect } from 'react';

import { Navigate, Route, Routes } from 'react-router-dom';

import c from '../assets/commonStyles/common.module.scss';
import { CardsList } from '../pages/cardsList/CardsList';
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
import { path } from '../utils/constants/constants';
import { useAppDispatch, useAppSelector } from '../utils/hooks/useSelectorUseDispatch';

export const App = () => {
  const isInitialized = useAppSelector(state => state.app.isInitialized);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initializeApp());
  }, [dispatch]);

  if (!isInitialized) {
    return (
      <div className={c.center}>
        <div className={c.loader} />
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
        <Route path={path.cardsList} element={<CardsList />} />
        <Route path="*" element={<Navigate to="not-found" />} />
      </Route>
      <Route path={path.notFound} element={<NotFound />} />
    </Routes>
  );
};
