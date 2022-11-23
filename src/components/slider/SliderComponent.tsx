import React, { memo, useEffect, useState } from 'react';

import { Slider } from '@mui/material';

import { setSliderValue } from '../../store/reducers/PacksReducer';
import { useDebounce } from '../../utils/hooks/useDebounce';
import { useAppDispatch, useAppSelector } from '../../utils/hooks/useSelectorUseDispatch';

import s from './slider.module.scss';

export const SliderComponent = memo(() => {
  const appStatus = useAppSelector(state => state.app.status);
  const minSliderValue = useAppSelector(state => state.packs.minCardsCount);
  const maxSliderValue = useAppSelector(state => state.packs.maxCardsCount);
  const [sliderLocalValue, setSliderLocalValue] = useState<number[]>([
    minSliderValue,
    maxSliderValue,
  ]);

  const dispatch = useAppDispatch();
  const debouncedValue = useDebounce(sliderLocalValue);

  const changeValue = (event: Event, newValue: number | number[]) => {
    setSliderLocalValue(newValue as number[]);
  };

  useEffect(() => {
    dispatch(setSliderValue(sliderLocalValue));
  }, [debouncedValue]);

  useEffect(() => {
    setSliderLocalValue([minSliderValue, maxSliderValue]);
  }, [minSliderValue, maxSliderValue]);

  return (
    <div className={s.main}>
      <span>Number of cards</span>
      <div className={s.sliderBlock}>
        <div className={s.value}>{sliderLocalValue[0]}</div>
        <div className={s.slider}>
          <Slider
            min={minSliderValue}
            max={maxSliderValue}
            value={sliderLocalValue}
            onChange={changeValue}
            disabled={appStatus === 'loading'}
          />
        </div>
        <div className={s.value}>{sliderLocalValue[1]}</div>
      </div>
    </div>
  );
});
