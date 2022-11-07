import React, { useCallback } from 'react';

import c from '../../assets/commonStyles/common.module.scss';
import { setSortCardBy } from '../../store/reducers/CardsReducer';
import { setSortPackBy } from '../../store/reducers/PacksReducer';
import {
  sortingCardsMethods,
  sortingPacksMethods,
} from '../../utils/constants/constants';
import { useAppDispatch } from '../../utils/hooks/useSelectorUseDispatch';

import { Caption } from './Caption';

export const Captions = ({ captions, isThisPlaceCards }: CaptionsType) => {
  const dispatch = useAppDispatch();

  const sortHandler = useCallback(
    (whatWeSort: string, isArrowDown: boolean) => {
      if (whatWeSort === 'Name') {
        if (isArrowDown) {
          dispatch(setSortPackBy(sortingPacksMethods.DES_NAME));
        } else if (!isArrowDown) {
          dispatch(setSortPackBy(sortingPacksMethods.ASC_NAME));
        }
      }
      if (whatWeSort === 'Cards') {
        if (isArrowDown) {
          dispatch(setSortPackBy(sortingPacksMethods.DES_CARDS_COUNT));
        } else if (!isArrowDown) {
          dispatch(setSortPackBy(sortingPacksMethods.ASC_CARDS_COUNT));
        }
      }
      if (whatWeSort === 'Last Updated') {
        if (isArrowDown) {
          if (!isThisPlaceCards) dispatch(setSortPackBy(sortingPacksMethods.DES_UPDATE));
          if (isThisPlaceCards) dispatch(setSortCardBy(sortingCardsMethods.DES_UPDATE));
        } else if (!isArrowDown) {
          if (!isThisPlaceCards) dispatch(setSortPackBy(sortingPacksMethods.ASC_UPDATE));
          if (isThisPlaceCards) dispatch(setSortCardBy(sortingCardsMethods.ASC_UPDATE));
        }
      }
      if (whatWeSort === 'Created by' || whatWeSort === 'Grade') {
        if (isArrowDown) {
          if (!isThisPlaceCards)
            dispatch(setSortPackBy(sortingPacksMethods.DES_USER_NAME));
          if (isThisPlaceCards) dispatch(setSortCardBy(sortingCardsMethods.DES_GRADE));
        } else if (!isArrowDown) {
          if (!isThisPlaceCards)
            dispatch(setSortPackBy(sortingPacksMethods.ASC_USER_NAME));
          if (isThisPlaceCards) dispatch(setSortCardBy(sortingCardsMethods.ASC_GRADE));
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
