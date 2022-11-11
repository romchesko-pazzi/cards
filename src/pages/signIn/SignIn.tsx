import React, { useCallback, useEffect, useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Checkbox, IconButton, InputAdornment, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import c from '../../assets/commonStyles/common.module.scss';
import { ButtonComponent } from '../../components/button/ButtonComponent';
import { SnackBar } from '../../components/snackBar/SnackBar';
import { Wrapper } from '../../components/wrapper/Wrapper';
import { login } from '../../store/thunks/thunks';
import { useAppDispatch, useAppSelector } from '../../utils/hooks/useSelectorUseDispatch';
import { SignInType } from '../../utils/types/types';
import { signInValidate } from '../../utils/validators/validators';

import s from './signIn.module.scss';

export const SignIn = () => {
  const { isLoggedIn } = useAppSelector(state => state.auth);
  const status = useAppSelector(state => state.app.status);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

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
    resolver: yupResolver(signInValidate),
  });

  const onSubmit = (data: SignInType) => {
    dispatch(login(data));
    reset();
  };

  const navigateToSignUp = useCallback(() => navigate('/signUp'), [navigate]);
  const handleClickShowPassword = () => setShowPassword(!showPassword);

  if (status === 'loading') {
    return (
      <div className={c.center}>
        <div className={c.loader} />
      </div>
    );
  }

  return (
    <Wrapper heading="Sign In">
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
          <ButtonComponent disabled={false} type="submit" title="Sign in" />
        </div>
        <div style={{ textAlign: 'end' }}>
          <Link className={s.link} to="/forgot">
            Forgot Password?
          </Link>
        </div>
        <div className={s.text}>Do not have an account?</div>
        <div className={s.button}>
          <ButtonComponent
            disabled={false}
            color="#26c526"
            callback={navigateToSignUp}
            type="button"
            title="Sign up"
          />
        </div>
      </form>
      <SnackBar />
    </Wrapper>
  );
};
