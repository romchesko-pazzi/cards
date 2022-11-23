import React from 'react';

import { useNavigate } from 'react-router-dom';

import c from '../../assets/commonStyles/common.module.scss';
import { DeleteModal } from '../../components/modals/deleteModal/DeleteModal';
import { EditModal } from '../../components/modals/editModal/EditModal';
import { SvgSelector } from '../../components/svgSelector/SvgSelector';
import { path } from '../../utils/constants/paths';

import s from './pack.module.scss';

export const Pack = (props: PackPropsType) => {
  const { author, packName, updated, cardsTotalCount, packId, userId } = props;
  const navigate = useNavigate();
  const time = new Date(updated).toLocaleDateString('ru');

  // Передаём данные о паке в CardsList
  const navigateToCardsPage = () => {
    navigate(path.cardsList, {
      state: {
        packName,
        packId,
        userId,
      },
    });
  };

  const navigateToLearnPage = () => {
    navigate(path.learn, {
      state: {
        packName,
        packId,
        cardsTotalCount,
      },
    });
  };

  return (
    <div className={c.item}>
      <div className={s.packName}>{packName}</div>
      <div>{cardsTotalCount}</div>
      <div>{time}</div>
      <div>{author}</div>
      <div className={c.icons}>
        <button onClick={navigateToCardsPage} type="button">
          <SvgSelector id="open" />
        </button>
        <button onClick={navigateToLearnPage} type="button">
          <SvgSelector id="learn" />
        </button>
        <EditModal
          isThisPlaceCards={false}
          propsUserId={userId}
          id={packId}
          name={packName}
        />
        <DeleteModal
          isThisPlaceCards={false}
          propsUserId={userId}
          id={packId}
          name={packName}
        />
      </div>
    </div>
  );
};

type PackPropsType = {
  packName: string;
  cardsTotalCount: number;
  updated: string;
  author: string;
  packId: string;
  userId: string;
};
