import React from 'react';

import { Button } from '@mui/material';

import s from './button.module.scss';

export const ButtonComponent: React.FC<ButtonPropsType> = props => {
  const { type, title, callback } = props;

  return (
    <Button onClick={callback} className={s.main} type={type} variant="contained">
      {title}
    </Button>
  );
};

type ButtonPropsType = {
  type: 'button' | 'submit' | 'reset';
  title: string;
  callback?: () => void;
};
