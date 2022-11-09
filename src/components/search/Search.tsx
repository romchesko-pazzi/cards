import React, { ChangeEvent, memo, useEffect, useState } from 'react';

import { setCardQuestion } from '../../store/reducers/CardsReducer';
import { setPackName } from '../../store/reducers/PacksReducer';
import { useDebounce } from '../../utils/hooks/useDebounce';
import { useAppDispatch } from '../../utils/hooks/useSelectorUseDispatch';
import { SvgSelector } from '../svgSelector/SvgSelector';

import s from './search.module.scss';

export const Search = memo(({ isThisPlaceCards }: SearchPropsType) => {
  const dispatch = useAppDispatch();
  const [value, setValue] = useState<string>('');
  const debouncedValue = useDebounce<string>(value);

  const placeholder = isThisPlaceCards ? 'Search by question' : 'Provide your text';

  useEffect(() => {
    if (isThisPlaceCards) {
      dispatch(setCardQuestion(value));
    } else if (!isThisPlaceCards) {
      dispatch(setPackName(value));
    }
  }, [debouncedValue, dispatch]);

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value);
  };

  const removeInputDataHandler = () => {
    if (value) setValue(''); // for cross and remove search area
  };

  return (
    <div className={s.search}>
      <span>Search</span>
      <div className={s.inputBlock}>
        <input
          className={s.input}
          onChange={onChangeHandler}
          value={value}
          type="text"
          placeholder={placeholder}
        />
        <button onClick={removeInputDataHandler} type="button" className={s.inputButton}>
          {value ? <SvgSelector id="cross" /> : <SvgSelector id="search" />}
        </button>
      </div>
    </div>
  );
});

type SearchPropsType = {
  isThisPlaceCards: boolean;
};
