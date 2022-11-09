import React, { ChangeEvent, memo, useEffect, useState } from 'react';

import { setPackName } from '../../store/reducers/PacksReducer';
import { useDebounce } from '../../utils/hooks/useDebounce';
import { useAppDispatch } from '../../utils/hooks/useSelectorUseDispatch';
import { SvgSelector } from '../svgSelector/SvgSelector';

import s from './search.module.scss';

export const Search = memo(() => {
  const dispatch = useAppDispatch();

  const [value, setValue] = useState<string>('');
  const debouncedValue = useDebounce<string>(value);

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value);
  };

  useEffect(() => {
    dispatch(setPackName(value));
  }, [debouncedValue, dispatch]);

  return (
    <div className={s.search}>
      <span>Search</span>
      <div className={s.inputBlock}>
        <input
          className={s.input}
          onChange={onChangeHandler}
          value={value}
          type="text"
          placeholder="Provide your text"
        />
        <button type="button" className={s.inputButton}>
          <SvgSelector id="search" />
        </button>
      </div>
    </div>
  );
});
