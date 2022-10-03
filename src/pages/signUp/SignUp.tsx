import React, { useEffect } from 'react';

import { TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { ButtonComponent } from '../../components/button/ButtonComponent';
import { SnackBar } from '../../components/snackBar/SnackBar';
import { signUp } from '../../store/reducers/AuthReducer';
import { useAppDispatch, useAppSelector } from '../../utils/hooks/hooks';
import { RegistrationType, SignUpType } from '../../utils/types/types';

import s from './signUp.module.scss';

export const SignUp = () => {
  const appStatus = useAppSelector(state => state.app.status);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (appStatus === 'successfully') {
      navigate('/');
    }
  }, [appStatus, navigate]);

  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm<SignUpType>({ mode: 'onBlur' });

  const onSubmit = (data: RegistrationType) => {
    dispatch(signUp(data));
    reset();
  };

  const navigateToSignIn = () => navigate('/');

  return (
    <div className={s.main}>
      <div className="frame">
        <div className={s.content}>
          <h2 className={s.heading}>Sign Up</h2>
          <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
            <TextField
              {...register('email', {
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email format',
                },
                required: 'Email is required',
              })}
              label={errors.email?.message}
              InputProps={{ className: s.input }}
              InputLabelProps={{ className: s.input }}
              error={!!errors.email?.message}
              variant="outlined"
              placeholder="Email"
              type="email"
            />
            <TextField
              {...register('password', {
                required: 'Password is required',
              })}
              label={errors.password?.message}
              InputProps={{ className: s.input }}
              InputLabelProps={{ className: s.input }}
              error={!!errors.password?.message}
              variant="outlined"
              placeholder="Password"
              type="password"
            />
            <TextField
              {...register('affirmation', {
                required: 'Confirm your password',
              })}
              label={errors.affirmation?.message}
              InputProps={{ className: s.input }}
              InputLabelProps={{ className: s.input }}
              error={!!errors.affirmation?.message}
              variant="outlined"
              placeholder="Confirm password"
              type="password"
            />
            <div className={s.button}>
              <ButtonComponent type="submit" title="Sign up" />
            </div>
            <div className={s.bottomArea}>
              <div style={{ textAlign: 'center' }}>Already have an account?</div>
              <div className={s.signIn}>
                <ButtonComponent
                  callback={navigateToSignIn}
                  type="button"
                  title="Sign in"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
      <SnackBar />
    </div>
  );
};
