import React, { ChangeEvent, useState } from 'react';

import { TextField } from '@mui/material';

import { SvgSelector } from '../svgSelector/SvgSelector';

import s from './editableSpan.module.scss';

export const EditableSpan: React.FC<PropsType> = ({ name, callback }) => {
  const [field, setField] = useState<'span' | 'input'>('span');
  const [value, setValue] = useState(name);

  const onClickHandler = () => {
    setField('input');
  };

  const onBlurHandler = () => {
    setField('span');
    callback(value);
  };

  const onChangeHandler = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setValue(event.currentTarget.value);
  };

  return (
    <div>
      {field === 'span' ? (
        <div className={s.spanBox}>
          <span>{value}</span>
          <button type="button" onClick={onClickHandler}>
            <SvgSelector id="edit" />
          </button>
        </div>
      ) : (
        <TextField
          InputProps={{ className: s.input }}
          onBlur={onBlurHandler}
          autoFocus
          variant="standard"
          onChange={onChangeHandler}
          value={value}
          type="text"
        />
      )}
    </div>
  );
};

type PropsType = {
  name: string;
  callback: (name: string) => void;
};
