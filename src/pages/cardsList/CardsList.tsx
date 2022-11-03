import React, { useEffect } from 'react';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';

import c from '../../assets/commonStyles/common.module.scss';
import { Captions } from '../../components/captions/Captions';
import { AddModal } from '../../components/modals/addModal/AddModal';
import { PaginationComponent } from '../../components/pagination/PaginationComponent';
import { Search } from '../../components/search/Search';
import { SnackBar } from '../../components/snackBar/SnackBar';
import { getCards } from '../../store/thunks/thunks';
import { cardsCaptions, path } from '../../utils/constants/constants';
import { useAppDispatch, useAppSelector } from '../../utils/hooks/useSelectorUseDispatch';
import { Card } from '../card/Card';

import s from './cardsList.module.scss';

export const CardsList = () => {
  const [, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const cards = useAppSelector(state => state.cards.cards);
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);

  const { packName, packId, userId } = location.state as LocationStateType;

  // dependencies for request (query params)
  const cardQuestion = useAppSelector(state => state.cards.queryParams.cardQuestion);
  const pageCount = useAppSelector(state => state.cards.queryParams.pageCount);
  const currentPage = useAppSelector(state => state.cards.queryParams.page);
  const totalCount = useAppSelector(state => state.cards.cardsTotalCount);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);
  useEffect(() => {
    dispatch(getCards(packId));
    // задаём init state, иначе setSearchParams location.state = null
    setSearchParams({ packId, userId }, { state: { packId, packName, userId } });
  }, [dispatch, packId, cardQuestion, pageCount, currentPage]);

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
        <AddModal isThisPlaceCards />
      </div>
      <div className={c.settings}>
        <Search isThisPlaceCards />
      </div>
      {cards.length === 0 ? (
        <div className={s.emptyPack}>This pack is empty.</div>
      ) : (
        <>
          <div className={c.table}>
            <Captions name="cards" captions={cardsCaptions} />
            {cards.map(card => {
              return (
                <Card
                  key={card._id}
                  question={card.question}
                  answer={card.answer}
                  updated={card.updated}
                  grade={card.grade}
                  cardId={card._id}
                />
              );
            })}
          </div>
          <PaginationComponent
            isThisPlaceCards
            pageCount={pageCount}
            currentPage={currentPage}
            totalCount={totalCount}
          />
        </>
      )}
      <SnackBar />
    </div>
  );
};

type LocationStateType = {
  packName: string;
  packId: string;
  userId: string;
};
