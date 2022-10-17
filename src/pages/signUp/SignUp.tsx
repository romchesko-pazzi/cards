import React, { useCallback, useEffect, useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { ButtonComponent } from '../../components/button/ButtonComponent';
import { SnackBar } from '../../components/snackBar/SnackBar';
import { Wrapper } from '../../components/wrapper/Wrapper';
import { signUp } from '../../store/thunks/thunks';
import { useAppDispatch, useAppSelector } from '../../utils/hooks/useSelectorUseDispatch';
import { RegistrationType, SignUpType } from '../../utils/types/types';
import { signUpValidate } from '../../utils/validators/validators';

import s from './signUp.module.scss';

export const SignUp = () => {
  const appStatus = useAppSelector(state => state.app.status);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

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
  } = useForm<SignUpType>({ mode: 'onBlur', resolver: yupResolver(signUpValidate) });

  const onSubmit = (data: RegistrationType) => {
    dispatch(signUp(data));
    reset();
  };

  const navigateToSignIn = useCallback(() => navigate('/'), [navigate]);
  const handleClickShowPassword = () => setShowPassword(!showPassword);

  return (
    <Wrapper heading="Sign Up">
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
        <TextField
          {...register('password')}
          label={errors.password?.message}
          InputProps={{
            className: s.input,
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          InputLabelProps={{ className: s.input }}
          error={!!errors.password?.message}
          variant="outlined"
          placeholder="Password"
          type={showPassword ? 'text' : 'password'}
        />
        <TextField
          {...register('confirmation')}
          label={errors.confirmation?.message}
          InputProps={{
            className: s.input,
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          InputLabelProps={{ className: s.input }}
          error={!!errors.confirmation?.message}
          variant="outlined"
          placeholder="Confirm password"
          type={showPassword ? 'text' : 'password'}
        />
        <div className={s.button}>
          <ButtonComponent color="#26c526" type="submit" title="Sign up" />
        </div>
        <div className={s.text}>Already have an account?</div>
        <div className={s.button}>
          <ButtonComponent callback={navigateToSignIn} type="button" title="Sign in" />
        </div>
      </form>
      <SnackBar />
    </Wrapper>
  );
};
