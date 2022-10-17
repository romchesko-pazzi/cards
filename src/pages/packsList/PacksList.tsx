import React, { ChangeEvent, useEffect, useState } from 'react';

import { Slider } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { ButtonComponent } from '../../components/button/ButtonComponent';
import { PaginationComponent } from '../../components/pagination/PaginationComponent';
import { SvgSelector } from '../../components/svgSelector/SvgSelector';
import { getPacks } from '../../store/thunks/thunks';
import { useDebounce } from '../../utils/hooks/useDebounce';
import { useAppDispatch, useAppSelector } from '../../utils/hooks/useSelectorUseDispatch';
import { Pack } from '../pack/Pack';

import s from './packsList.module.scss';

export const PacksList = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [value, setValue] = useState<string>('');
  const debouncedValue = useDebounce<string>(value);
  const packs = useAppSelector(state => state.packs.cardPacks);
  const pageCount = useAppSelector(state => state.packs.pageCount);
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);

  useEffect(() => {
    dispatch(getPacks({ packName: value, pageCount }));
  }, [dispatch, debouncedValue]);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value);
  };

  return (
    <div className={s.frame}>
      <div className={s.heading}>
        <h3>Packs list</h3>
        <div>
          <ButtonComponent title="Add new pack" />
        </div>{' '}
      </div>
      <div className={s.settings}>
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
        <div className={s.myOrAll}>
          <span>Show packs cards</span>
          <div className={s.buttons}>
            <button className={s.button} type="button">
              My
            </button>
            <button className={s.button} type="button">
              All
            </button>
          </div>
        </div>
        <div className={s.cardsCount}>
          <span>Number of cards</span>
          <div className={s.sliderBlock}>
            <div className={s.value}>2</div>
            <div className={s.slider}>
              <Slider />
            </div>
            <div className={s.value}>10</div>
          </div>
        </div>
      </div>
      <div className={s.table}>
        <div className={s.captions}>
          <div>Name</div>
          <div>Cards</div>
          <div>Last Updated</div>
          <div>Created by</div>
          <div>Actions</div>
        </div>
        {packs.map(item => {
          return (
            <Pack
              key={item._id}
              packName={item.name}
              cardsCount={item.cardsCount}
              updated={item.updated}
              author={item.user_name}
            />
          );
        })}
      </div>
      <PaginationComponent />
    </div>
  );
};
