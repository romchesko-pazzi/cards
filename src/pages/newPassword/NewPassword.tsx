import React, { useEffect, useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

import { ButtonComponent } from '../../components/button/ButtonComponent';
import { Wrapper } from '../../components/wrapper/Wrapper';
import { setNewPassword } from '../../store/thunks/thunks';
import { useAppDispatch, useAppSelector } from '../../utils/hooks/useSelectorUseDispatch';
import { newPasswordValidate } from '../../utils/validators/validators';

import s from './newPassword.module.scss';

export const NewPassword = () => {
  const dispatch = useAppDispatch();
  const isPasswordSet = useAppSelector(state => state.auth.isPasswordSet);
  const navigate = useNavigate();
  const { token } = useParams();
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (isPasswordSet) {
      navigate('/');
    }
  }, [isPasswordSet, navigate]);

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm<{ password: string }>({
    mode: 'onBlur',
    resolver: yupResolver(newPasswordValidate),
  });
  const onSubmit = (data: { password: string }) => {
    if (token) {
      dispatch(setNewPassword({ password: data.password, resetPasswordToken: token }));
    }
    reset();
  };

  return (
    <Wrapper heading="Create new password">
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
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
          placeholder="New password"
          type={showPassword ? 'text' : 'password'}
        />
        <div className={s.text}>Create new password</div>
        <div className={s.button}>
          <ButtonComponent disabled={false} type="submit" title="Set new password" />
        </div>
      </form>
    </Wrapper>
  );
};
