import React from 'react';

import { Rating } from '@mui/material';

import c from '../../assets/commonStyles/common.module.scss';

import s from './card.module.scss';

export const Card = (props: PropsType) => {
  const { question, answer, updated, grade } = props;
  const time = new Date(updated).toLocaleDateString('ru');

  return (
    <div className={c.item}>
      <div>{question}</div>
      <div>{answer}</div>
      <div>{time}</div>
      <div className={s.rating}>
        <Rating defaultValue={grade} />
      </div>
    </div>
  );
};

type PropsType = {
  question: string;
  answer: string;
  updated: string;
  grade: number;
};
