import React, { memo, useState } from 'react';

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { IconButton } from '@mui/material';

export const Caption = memo(({ name, callback }: CaptionType) => {
  const [isArrowDown, setIsArrowDown] = useState(true);

  const handler = () => {
    callback(name, isArrowDown);
    setIsArrowDown(!isArrowDown);
  };

  return (
    <div>
      <span>{name}</span>
      <IconButton sx={{ padding: '.2rem' }} onClick={handler}>
        {isArrowDown ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}
      </IconButton>
    </div>
  );
});

type CaptionType = {
  name: string;
  callback: (name: string, positionOfArrow: boolean) => void;
};
