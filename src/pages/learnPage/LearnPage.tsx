import React, { ChangeEvent, useEffect, useState } from 'react';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { CardType } from '../../api/cardsAPI';
import c from '../../assets/commonStyles/common.module.scss';
import { ButtonComponent } from '../../components/button/ButtonComponent';
import { setIsCardsFetched } from '../../store/reducers/CardsReducer';
import { getCards, rateCard } from '../../store/thunks/thunks';
import { path } from '../../utils/constants/constants';
import { getRandomCard } from '../../utils/constants/randomizer';
import { useAppDispatch, useAppSelector } from '../../utils/hooks/useSelectorUseDispatch';

import s from './learnPage.module.scss';

const values: RatingType[] = [
  { value: 1, label: "Didn't know 1" },
  { value: 2, label: 'Forgot 2' },
  { value: 3, label: 'Doubted 3' },
  { value: 4, label: 'Confused 4' },
  { value: 5, label: 'Knew the answer 5' },
];

const initRandomCard: CardType = {
  cardsPack_id: '',
  answer: '',
  user_id: '',
  question: '',
  updated: '',
  _id: '',
  grade: 0,
  shots: 0,
};

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
  const { packName, packId } = location.state as LocationStateType;

  // only 1 time getCards
  useEffect(() => {
    dispatch(getCards(packId));

    // clear cards in store
    return () => {
      dispatch(setIsCardsFetched(false));
    };
  }, []);

  useEffect(() => {
    // set card only when we have data
    if (isCardsFetched) {
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
      <Link to={path.packsList}>
        <div className={c.returnToPackList}>
          <ArrowBackIcon fontSize="large" />
          <span>Back to pack list</span>
        </div>
      </Link>
      <div className={s.learnBox}>
        <div className={s.heading}>
          <h2>Learn {`"${packName}"`}</h2>
        </div>
        <div className={s.contentBox}>
          <div>Question: {randomCard.question}</div>
          <div>Count of attempts to answer the question: {randomCard.shots}</div>
          {!isShow && (
            <div className={s.button}>
              <ButtonComponent callback={showAnswer} title="Show answer" />
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
                      control={<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: 20 } }} />}
                      label={m.label}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
              <div className={s.button}>
                <ButtonComponent callback={nextQuestion} title="Next Question" />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

type LocationStateType = {
  packName: string;
  packId: string;
};

type RatingType = {
  label: string;
  value: number;
};
