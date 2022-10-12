import React from 'react';

import s from './pack.module.scss';

export const Pack = (props: PackPropsType) => {
  const { author, packName, updated, cardsCount } = props;

  const time = new Date(updated).toLocaleDateString('ru');

  return (
    <div className={s.pack}>
      <div>{packName}</div>
      <div>{cardsCount}</div>
      <div>{time}</div>
      <div>{author}</div>
      <div>icons</div>
    </div>
  );
};

type PackPropsType = {
  packName: string;
  cardsCount: number;
  updated: string;
  author: string;
};
