import React from 'react';

import { SvgSelector } from '../../components/svgSelector/SvgSelector';

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
      <div className={s.icons}>
        <button type="button">
          <SvgSelector id="learn" />
        </button>
        <button type="button">
          <SvgSelector id="edit" />
        </button>
        <button type="button">
          <SvgSelector id="trash" />
        </button>
      </div>
    </div>
  );
};

type PackPropsType = {
  packName: string;
  cardsCount: number;
  updated: string;
  author: string;
};
