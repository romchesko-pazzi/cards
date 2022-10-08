import React, { memo } from 'react';

import { Button } from '@mui/material';

import s from './button.module.scss';

export const ButtonComponent = memo((props: ButtonPropsType) => {
  const { type, title, callback, color } = props;

  return (
    <Button
      sx={{ backgroundColor: color || '#366EFF' }}
      onClick={callback}
      className={s.main}
      type={type}
      variant="contained"
    >
      {title}
    </Button>
  );
});

type ButtonPropsType = {
  type: 'button' | 'submit' | 'reset';
  title: string;
  color?: string;
  callback?: () => void;
};
