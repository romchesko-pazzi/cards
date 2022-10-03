import React, { useEffect } from 'react';

import { Checkbox, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { ButtonComponent } from '../../components/button/ButtonComponent';
import { SnackBar } from '../../components/snackBar/SnackBar';
import { login } from '../../store/reducers/AuthReducer';
import { useAppDispatch, useAppSelector } from '../../utils/hooks/hooks';
import { SignInType } from '../../utils/types/types';

import s from './signIn.module.scss';

export const SignIn = () => {
  const { isLoggedIn } = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/profile');
    }
  }, [isLoggedIn, navigate]);
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm<SignInType>({
    mode: 'onBlur',
  });
  const onSubmit = (data: SignInType) => {
    dispatch(login(data));
    reset();
  };
  const navigateToSignUp = () => navigate('/signUp');

  return (
    <div className={s.main}>
      <div className="frame">
        <div className={s.content}>
          <h2 className={s.heading}>Sign In</h2>
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
            <div className={s.checkbox}>
              <Checkbox
                {...register('rememberMe')}
                id="check"
                sx={{ '& .MuiSvgIcon-root': { fontSize: 25 } }}
              />
              <label style={{ cursor: 'pointer' }} htmlFor="check">
                Remember me
              </label>
            </div>
            <div className={s.button}>
              <ButtonComponent type="submit" title="Sign in" />
            </div>
            <div className={s.bottomArea}>
              <div style={{ textAlign: 'end', color: '#366EFF' }}>Forgot Password?</div>
              <div style={{ textAlign: 'center' }}>Do not have an account?</div>
              <div className={s.signUp}>
                <ButtonComponent
                  callback={navigateToSignUp}
                  type="button"
                  title="Sign up"
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
