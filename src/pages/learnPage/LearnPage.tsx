import React, { ChangeEvent, useEffect, useState } from 'react';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Rating,
} from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { CardType } from '../../api/cardsAPI';
import c from '../../assets/commonStyles/common.module.scss';
import { ButtonComponent } from '../../components/button/ButtonComponent';
import { setCardsPerPage, setIsCardsFetched } from '../../store/reducers/CardsReducer';
import { getCards, rateCard } from '../../store/thunks/thunks';
import { nums } from '../../utils/constants/commonNums';
import { path } from '../../utils/constants/paths';
import { getRandomCard } from '../../utils/constants/randomizer';
import { initRandomCard, values } from '../../utils/constants/valuesForLearnPage';
import { useAppDispatch, useAppSelector } from '../../utils/hooks/useSelectorUseDispatch';

import s from './learnPage.module.scss';

export const LearnPage = () => {
  const [isShow, setIsShow] = useState(false);
  const [randomCard, setRandomCard] = useState<CardType>(initRandomCard);
  const [currentRating, setCurrentRating] = useState<number>(0);

  const location = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const cards = useAppSelector(state => state.cards.cards);
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);
  const isCardsFetched = useAppSelector(state => state.cards.isCardsFetched);
  const { packName, packId, cardsTotalCount } = location.state as LocationStateType;

  // only 1 time getCards
  useEffect(() => {
    dispatch(setCardsPerPage(cardsTotalCount));
    dispatch(getCards(packId));

    // clear cards in store
    return () => {
      dispatch(setIsCardsFetched(false));
      dispatch(setCardsPerPage(nums.basicItemsPerPage));
    };
  }, []);

  useEffect(() => {
    // set card only when we have data
    if (isCardsFetched && cards.length > 0) {
      setRandomCard(getRandomCard(cards));
    }
    if (!isLoggedIn) {
      navigate('/');
    }
  }, [dispatch, packId, isCardsFetched, isLoggedIn]);

  const showAnswer = () => setIsShow(true);

  const nextQuestion = () => {
    setIsShow(false);
    dispatch(rateCard(packId, { card_id: randomCard._id, grade: currentRating }));
  };

  const setRate = (event: ChangeEvent<HTMLInputElement>) => {
    setCurrentRating(Number(event.currentTarget.value));
  };

  if (!isCardsFetched) {
    return (
      <div className={c.center}>
        <div className={c.loader} />
      </div>
    );
  }

  return (
    <div className={c.frame}>
      <Link className={c.returnToPackList} to={path.packsList}>
        <ArrowBackIcon fontSize="large" />
        <span>Back to pack list</span>
      </Link>
      <div className={s.learnBox}>
        {cards.length === 0 ? (
          <div className={c.emptyPack}>This pack is empty.</div>
        ) : (
          <>
            <div className={s.heading}>
              <h2>Learn {`"${packName}"`}</h2>
            </div>
            <div className={s.contentBox}>
              <div className={s.questionBox}>
                <div>Question: {randomCard.question}</div>
                <div className={c.rating}>
                  <Rating
                    onChange={() => {}}
                    precision={0.1}
                    readOnly
                    value={randomCard.grade}
                  />
                </div>
              </div>
              <div>Count of attempts to answer the question: {randomCard.shots}</div>
              {!isShow && (
                <div className={s.button}>
                  <ButtonComponent
                    disabled={false}
                    callback={showAnswer}
                    title="Show answer"
                  />
                </div>
              )}
              {isShow && (
                <>
                  <div>Answer: {randomCard.answer}</div>
                  <FormControl>
                    <FormLabel className={s.rateLabel}>Rate yourself:</FormLabel>
                    <RadioGroup onChange={setRate} className={s.radioButton}>
                      {values.map(m => (
                        <FormControlLabel
                          key={m.label}
                          value={m.value}
                          control={
                            <Radio sx={{ '& .MuiSvgIcon-root': { fontSize: 20 } }} />
                          }
                          label={m.label}
                        />
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <div className={s.button}>
                    <ButtonComponent
                      disabled={currentRating === 0}
                      callback={nextQuestion}
                      title="Next Question"
                    />
                  </div>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

type LocationStateType = {
  packName: string;
  packId: string;
  cardsTotalCount: number; // for correct display cards on LearnPage
};
