import React, { useEffect } from 'react';

import { Slider } from '@mui/material';

import { ButtonComponent } from '../../components/button/ButtonComponent';
import { getPacks } from '../../store/thunks/thunks';
import { useAppDispatch, useAppSelector } from '../../utils/hooks/hooks';
import { SvgSelector } from '../../utils/SvgSelector';

import s from './packsList.module.scss';

export const PacksList = () => {
  const dispatch = useAppDispatch();
  const packName = useAppSelector(state => state.packs.name);
  const cardsCount = useAppSelector(state => state.packs.cardsCount);
  const lastUpdated = useAppSelector(state => state.packs.updated);
  const author = useAppSelector(state => state.packs.user_name);

  useEffect(() => {
    dispatch(getPacks());
  }, [dispatch]);

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
            <input className={s.input} type="text" placeholder="Provide your text" />
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
          <span>Name</span>
          <span>Cards</span>
          <span>Last Updated</span>
          <span>Created by</span>
          <span>Actions</span>
        </div>
        <div className={s.packsList}>
          <div>PackName</div>
          <div>CardsCount</div>
          <div>18.03.22</div>
          <div>Roman</div>
          <div>Icons</div>
        </div>
      </div>
    </div>
  );
};
