import React, { useEffect } from 'react';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link, useLocation } from 'react-router-dom';

import c from '../../assets/commonStyles/common.module.scss';
import { ButtonComponent } from '../../components/button/ButtonComponent';
import { PaginationComponent } from '../../components/pagination/PaginationComponent';
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
  }, [dispatch, packId]);

  return (
    <div className={c.frame}>
      <Link to={path.packsList}>
        <div className={s.returnToPackList}>
          <ArrowBackIcon fontSize="large" />
          <span>Back to pack list</span>
        </div>
      </Link>
      <div className={c.heading}>
        <h3>{packName}</h3>
        <ButtonComponent title="Learn the pack" />
      </div>
      <div className={c.settings}>
        <Search />
      </div>
      <div className={c.table}>
        <div className={c.captions}>
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
      <PaginationComponent />
    </div>
  );
};

type LocationStateType = {
  packName: string;
  packId: string;
};
