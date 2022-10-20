import React from 'react';

import { SvgSelector } from '../../components/svgSelector/SvgSelector';
import { deletePack } from '../../store/thunks/thunks';
import { useAppDispatch } from '../../utils/hooks/useSelectorUseDispatch';

import s from './pack.module.scss';

export const Pack = (props: PackPropsType) => {
  const { author, packName, updated, cardsCount, packId } = props;

  const dispatch = useAppDispatch();

  const time = new Date(updated).toLocaleDateString('ru');

  const deletePackHandler = () => {
    dispatch(deletePack(packId));
  };

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
        <button onClick={deletePackHandler} type="button">
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
  packId: string;
};
