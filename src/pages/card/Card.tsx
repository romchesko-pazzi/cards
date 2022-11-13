import React from 'react';

import { Rating } from '@mui/material';

import c from '../../assets/commonStyles/common.module.scss';
import { DeleteModal } from '../../components/modals/deleteModal/DeleteModal';
import { EditModal } from '../../components/modals/editModal/EditModal';

export const Card = (props: PropsType) => {
  const { question, answer, updated, grade, cardId } = props;
  const time = new Date(updated).toLocaleDateString('ru');

  return (
    <div className={c.item}>
      <div>{question}</div>
      <div>{answer}</div>
      <div>{time}</div>
      <div className={c.rating}>
        <Rating readOnly value={grade} />
      </div>
      <div className={c.icons}>
        <EditModal isThisPlaceCards id={cardId} name={question} optionName={answer} />
        <DeleteModal isThisPlaceCards id={cardId} name={question} />
      </div>
    </div>
  );
};

type PropsType = {
  question: string;
  answer: string;
  updated: string;
  grade: number;
  cardId: string;
};
