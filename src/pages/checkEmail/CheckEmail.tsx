import React from 'react';

import { useNavigate } from 'react-router-dom';

import { ButtonComponent } from '../../components/button/ButtonComponent';
import { SvgSelector } from '../../components/svgSelector/SvgSelector';
import { Wrapper } from '../../components/wrapper/Wrapper';
import { sentEmail } from '../../store/reducers/AuthReducer';
import { useAppDispatch, useAppSelector } from '../../utils/hooks/useSelectorUseDispatch';

import s from './checkEmail.module.scss';

export const CheckEmail = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const email = useAppSelector(state => state.profile.email);
  const backToSignIn = () => {
    dispatch(sentEmail(false));
    navigate('/');
  };

  return (
    <Wrapper heading="Check email">
      <div className={s.main}>
        <div>
          <SvgSelector id="email" />
        </div>
        <div className={s.text}>We’ve sent an Email with instructions to {email}</div>
        <div>
          <ButtonComponent
            disabled={false}
            callback={backToSignIn}
            type="button"
            title="Back to sign in"
          />
        </div>
      </div>
    </Wrapper>
  );
};
