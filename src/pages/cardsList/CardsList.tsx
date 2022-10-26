import React, { useEffect } from 'react';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link, useLocation } from 'react-router-dom';

import { ButtonComponent } from '../../components/button/ButtonComponent';
import { Search } from '../../components/search/Search';
import { getCards } from '../../store/thunks/thunks';
import { path } from '../../utils/constants';
import { useAppDispatch, useAppSelector } from '../../utils/hooks/useSelectorUseDispatch';
import { Card } from '../card/Card';

import s from './cardsList.module.scss';

export const CardsList = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const cards = useAppSelector(state => state.cards.cards);
  const { packName, packId } = location.state as LocationStateType;

  useEffect(() => {
    dispatch(getCards(packId));
  }, [dispatch]);

  return (
    <div className={s.frame}>
      <Link to={path.packsList}>
        <div className={s.returnToPackList}>
          <ArrowBackIcon fontSize="large" />
          <span>Back to pack list</span>
        </div>
      </Link>
      <div className={s.heading}>
        <h3>{packName}</h3>
        <ButtonComponent title="Learn the pack" />
      </div>
      <div className={s.settings}>
        <Search />
      </div>
      <div className={s.table}>
        <div className={s.captions}>
          <div>Question</div>
          <div>Answer</div>
          <div>Last updated</div>
          <div>Grade</div>
        </div>
        {cards.map(card => {
          return (
            <Card
              key={card._id}
              question={card.question}
              answer={card.answer}
              updated={card.updated}
              grade={card.grade}
            />
          );
        })}
      </div>
    </div>
  );
};

type LocationStateType = {
  packName: string;
  packId: string;
};
