import React, { useEffect } from 'react';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';

import c from '../../assets/commonStyles/common.module.scss';
import { Captions } from '../../components/captions/Captions';
import { AddModal } from '../../components/modals/addModal/AddModal';
import { PaginationComponent } from '../../components/pagination/PaginationComponent';
import { PopoverComponent } from '../../components/popover/PopoverComponent';
import { Search } from '../../components/search/Search';
import { SnackBar } from '../../components/snackBar/SnackBar';
import { setIsCardsFetched } from '../../store/reducers/CardsReducer';
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
  const status = useAppSelector(state => state.app.status);

  const { packName, packId, userId } = location.state as LocationStateType;

  // dependencies for request (query params)
  const cardQuestion = useAppSelector(state => state.cards.queryParams.cardQuestion);
  const pageCount = useAppSelector(state => state.cards.queryParams.pageCount);
  const currentPage = useAppSelector(state => state.cards.queryParams.page);
  const totalCount = useAppSelector(state => state.cards.cardsTotalCount);
  const sortBy = useAppSelector(state => state.cards.queryParams.sortCards);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);
  useEffect(() => {
    dispatch(getCards(packId));
    // задаём init state, иначе setSearchParams location.state = null
    setSearchParams({ packId, userId }, { state: { packId, packName, userId } });

    // clear cards in store
    return () => {
      dispatch(setIsCardsFetched(false));
    };
  }, [dispatch, packId, cardQuestion, pageCount, currentPage, sortBy]);

  return (
    <div className={c.frame}>
      <Link className={c.returnToPackList} to={path.packsList}>
        <ArrowBackIcon fontSize="large" />
        <span>Back to pack list</span>
      </Link>
      <div className={c.heading}>
        <div className={s.interactWithPack}>
          <h3>{packName}</h3>
          <PopoverComponent packName={packName} packId={packId} />
        </div>
        <AddModal isThisPlaceCards />
      </div>
      <div className={c.settings}>
        <Search isThisPlaceCards />
      </div>
      {cards.length === 0 && status !== 'loading' ? (
        <div className={s.emptyPack}>This pack is empty.</div>
      ) : (
        <>
          <div className={c.table}>
            <Captions isThisPlaceCards captions={cardsCaptions} />
            {status === 'loading' ? (
              <div className={s.loadingBlock}>
                <div className={s.center}>
                  <div className={c.loader} />
                </div>
              </div>
            ) : (
              <>
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
              </>
            )}
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
