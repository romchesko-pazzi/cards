import React from 'react';

import s from '../pack/pack.module.scss';

export const Card = (props: PropsType) => {
  const { question, answer, updated, grade } = props;

  return (
    <div className={s.card}>
      <div>{question}</div>
      <div>{answer}</div>
      <div>{updated}</div>
      <div>{grade}</div>
    </div>
  );
};

type PropsType = {
  question: string;
  answer: string;
  updated: string;
  grade: number;
};
