import React, { useCallback } from 'react';

import c from '../../assets/commonStyles/common.module.scss';
import { setSortCardBy } from '../../store/reducers/CardsReducer';
import { setSortPackBy } from '../../store/reducers/PacksReducer';
import {
  sortingCardsMethods,
  sortingPacksMethods,
} from '../../utils/constants/sortingMethods';
import { useAppDispatch } from '../../utils/hooks/useSelectorUseDispatch';

import { Caption } from './Caption';

export const Captions = ({ captions, isThisPlaceCards }: CaptionsType) => {
  const dispatch = useAppDispatch();

  const sortHandler = useCallback(
    (whatWeSort: string, isArrowDown: boolean) => {
      if (whatWeSort === 'Name') {
        if (isArrowDown) {
          dispatch(setSortPackBy(sortingPacksMethods.desName));
        } else if (!isArrowDown) {
          dispatch(setSortPackBy(sortingPacksMethods.ascName));
        }
      }
      if (whatWeSort === 'Cards') {
        if (isArrowDown) {
          dispatch(setSortPackBy(sortingPacksMethods.desCardsCount));
        } else if (!isArrowDown) {
          dispatch(setSortPackBy(sortingPacksMethods.ascCardsCount));
        }
      }
      if (whatWeSort === 'Last Updated') {
        if (isArrowDown) {
          if (!isThisPlaceCards) dispatch(setSortPackBy(sortingPacksMethods.desUpdate));
          if (isThisPlaceCards) dispatch(setSortCardBy(sortingCardsMethods.desUpdate));
        } else if (!isArrowDown) {
          if (!isThisPlaceCards) dispatch(setSortPackBy(sortingPacksMethods.ascUpdate));
          if (isThisPlaceCards) dispatch(setSortCardBy(sortingCardsMethods.ascUpdate));
        }
      }
      if (whatWeSort === 'Created by' || whatWeSort === 'Grade') {
        if (isArrowDown) {
          if (!isThisPlaceCards) dispatch(setSortPackBy(sortingPacksMethods.desUserName));
          if (isThisPlaceCards) dispatch(setSortCardBy(sortingCardsMethods.desGrade));
        } else if (!isArrowDown) {
          if (!isThisPlaceCards) dispatch(setSortPackBy(sortingPacksMethods.ascUserName));
          if (isThisPlaceCards) dispatch(setSortCardBy(sortingCardsMethods.ascGrade));
        }
      }
    },
    [dispatch],
  );

  return (
    <div className={c.captions}>
      {captions.map(m => (
        <Caption key={m.id} name={m.label} callback={sortHandler} />
      ))}
      <div>
        <span>Actions</span>
      </div>
    </div>
  );
};

type CaptionsType = {
  captions: Array<{ id: string; label: string }>;
  isThisPlaceCards: boolean;
};
