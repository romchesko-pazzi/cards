import React, { memo, useCallback, useEffect } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { ButtonComponent } from '../../components/button/ButtonComponent';
import { SnackBar } from '../../components/snackBar/SnackBar';
import { Wrapper } from '../../components/wrapper/Wrapper';
import { forgot } from '../../store/thunks/thunks';
import { useAppDispatch, useAppSelector } from '../../utils/hooks/useSelectorUseDispatch';
import { forgotValidate } from '../../utils/validators/validators';

import s from './forgot.module.scss';

export const Forgot = memo(() => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isEmailSent = useAppSelector(state => state.auth.isEmailSent);

  useEffect(() => {
    if (isEmailSent) {
      navigate('/check-email');
    }
  }, [isEmailSent, navigate]);

  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm<{ email: string }>({
    mode: 'onBlur',
    resolver: yupResolver(forgotValidate),
  });
  const onSubmit = (data: { email: string }) => {
    dispatch(forgot(data.email));
    reset();
  };
  const navigateToSignIn = useCallback(() => navigate('/'), [navigate]);

  return (
    <Wrapper heading="Forgot your password?">
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <TextField
          {...register('email')}
          label={errors.email?.message}
          InputProps={{ className: s.input }}
          InputLabelProps={{ className: s.input }}
          error={!!errors.email?.message}
          variant="outlined"
          placeholder="Email"
          type="email"
        />
        <div className={s.text}>
          <p>Enter your email address and we will send you further instructions</p>
        </div>
        <div className={s.button}>
          <ButtonComponent color="#26c526" type="submit" title="Send" />
        </div>
        <div className={s.button}>
          <ButtonComponent callback={navigateToSignIn} type="button" title="Sign in" />
        </div>
      </form>
      <SnackBar />
    </Wrapper>
  );
});
