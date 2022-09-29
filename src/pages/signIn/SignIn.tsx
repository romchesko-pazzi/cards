import React, { useEffect } from 'react';

import { Checkbox, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { ButtonComponent } from '../../components/button/ButtonComponent';
import { login } from '../../store/reducers/AuthReducer';
import { useAppDispatch, useAppSelector } from '../../utils/hooks/hooks';
import { LoginDataType } from '../../utils/types/types';

import s from './SignIn.module.scss';

export const SignIn = () => {
  const { isLoggedIn } = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/profile');
    }
  }, [isLoggedIn]);

  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm<LoginDataType>({
    mode: 'onBlur',
  });
  const onSubmit = (data: LoginDataType) => {
    dispatch(login(data));
    reset();
  };

  return (
    <div className={s.main}>
      <div className="frame">
        <div className={s.content}>
          <h2 className={s.heading}>Sign In</h2>
          <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
            <TextField
              {...register('email', {
                required: 'Email is required',
              })}
              label={errors.email?.message}
              InputProps={{ className: s.input }}
              InputLabelProps={{ className: s.input }}
              error={!!errors.email?.message}
              variant="outlined"
              placeholder="Email"
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
            <div className={s.forgotArea}>
              <div style={{ textAlign: 'end', color: '#366EFF' }}>Forgot Password?</div>
              <div style={{ textAlign: 'center' }}>Do not have an account?</div>
              <div className={s.signUp}>
                <ButtonComponent title="Sign up" />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
