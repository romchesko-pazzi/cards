import React, { memo, useEffect, useState } from 'react';

import { Slider } from '@mui/material';

import { setSliderValue } from '../../store/reducers/PacksReducer';
import { useDebounce } from '../../utils/hooks/useDebounce';
import { useAppDispatch, useAppSelector } from '../../utils/hooks/useSelectorUseDispatch';

import s from './slider.module.scss';

export const SliderComponent = memo(() => {
  const appStatus = useAppSelector(state => state.app.status);
  const min = useAppSelector(state => state.packs.queryParams.min);
  const max = useAppSelector(state => state.packs.queryParams.max);
  const minSliderValue = useAppSelector(state => state.packs.minCardsCount);
  const maxSliderValue = useAppSelector(state => state.packs.maxCardsCount);
  const [values, setValues] = useState<number[]>([min, max]);

  const dispatch = useAppDispatch();
  const debouncedValue = useDebounce(values);

  const changeValues = (event: Event, newValue: number | number[]) => {
    setValues(newValue as number[]);
  };

  useEffect(() => {
    dispatch(setSliderValue(values));
  }, [debouncedValue]);

  useEffect(() => {
    setValues([min, max]);
  }, [min, max]);

  useEffect(() => {
    dispatch(setSliderValue([minSliderValue, maxSliderValue]));
  }, [minSliderValue, maxSliderValue]);

  return (
    <div className={s.main}>
      <span>Number of cards</span>
      <div className={s.sliderBlock}>
        <div className={s.value}>{values[0]}</div>
        <div className={s.slider}>
          <Slider
            min={minSliderValue}
            max={maxSliderValue}
            value={values}
            onChange={changeValues}
            disabled={appStatus === 'loading'}
          />
        </div>
        <div className={s.value}>{values[1]}</div>
      </div>
    </div>
  );
});
