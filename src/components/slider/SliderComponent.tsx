import React, { useEffect, useState } from 'react';

import { Slider } from '@mui/material';

import { setSliderValue } from '../../store/reducers/PacksReducer';
import { useDebounce } from '../../utils/hooks/useDebounce';
import { useAppDispatch, useAppSelector } from '../../utils/hooks/useSelectorUseDispatch';

import s from './slider.module.scss';

export const SliderComponent = ({ min, max }: SliderPropsType) => {
  const [value, setValue] = useState<number[]>([min, max]);
  const debouncedValue = useDebounce(value);
  const dispatch = useAppDispatch();
  const minCardsCount = useAppSelector(state => state.packs.minCardsCount);
  const maxCardsCount = useAppSelector(state => state.packs.maxCardsCount);

  const changeValues = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  useEffect(() => {
    dispatch(setSliderValue(value));
  }, [debouncedValue]);

  return (
    <div className={s.main}>
      <span>Number of cards</span>
      <div className={s.sliderBlock}>
        <div className={s.value}>{value[0]}</div>
        <div className={s.slider}>
          <Slider
            min={minCardsCount}
            max={maxCardsCount}
            value={value}
            onChange={changeValues}
          />
        </div>
        <div className={s.value}>{value[1]}</div>
      </div>
    </div>
  );
};

type SliderPropsType = {
  min: number;
  max: number;
};
