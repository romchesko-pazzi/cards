import React from 'react';

import { useNavigate } from 'react-router-dom';

import c from '../../assets/commonStyles/common.module.scss';
import { DeleteModal } from '../../components/modals/deleteModal/DeleteModal';
import { EditModal } from '../../components/modals/editModal/EditModal';
import { SvgSelector } from '../../components/svgSelector/SvgSelector';
import { path } from '../../utils/constants/constants';

export const Pack = (props: PackPropsType) => {
  const { author, packName, updated, cardsCount, packId, userId } = props;
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

  return (
    <div className={c.item}>
      <div>{packName}</div>
      <div>{cardsCount}</div>
      <div>{time}</div>
      <div>{author}</div>
      <div className={c.icons}>
        <button onClick={navigateToCardsPage} type="button">
          <SvgSelector id="open" />
        </button>
        <button type="button">
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
  cardsCount: number;
  updated: string;
  author: string;
  packId: string;
  userId: string;
};
