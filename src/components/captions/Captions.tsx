import React, { useCallback } from 'react';

import c from '../../assets/commonStyles/common.module.scss';
import { setSortPackBy } from '../../store/reducers/PacksReducer';
import { sortingMethods } from '../../utils/constants/constants';
import { useAppDispatch } from '../../utils/hooks/useSelectorUseDispatch';

import { Caption } from './Caption';

export const Captions = ({ captions, name }: CaptionsType) => {
  const dispatch = useAppDispatch();

  const sortHandler = useCallback(
    (whatWeSort: string, isArrowDown: boolean) => {
      if (whatWeSort === 'Name') {
        if (isArrowDown) {
          dispatch(setSortPackBy(sortingMethods.DES_NAME));
        } else if (!isArrowDown) {
          dispatch(setSortPackBy(sortingMethods.ASC_NAME));
        }
      }
      if (whatWeSort === 'Cards') {
        if (isArrowDown) {
          dispatch(setSortPackBy(sortingMethods.DES_CARDS_COUNT));
        } else if (!isArrowDown) {
          dispatch(setSortPackBy(sortingMethods.ASC_CARDS_COUNT));
        }
      }
      if (whatWeSort === 'Last Updated') {
        if (isArrowDown) {
          dispatch(setSortPackBy(sortingMethods.DES_UPDATE));
        } else if (!isArrowDown) {
          dispatch(setSortPackBy(sortingMethods.ASC_UPDATE));
        }
      }
      if (whatWeSort === 'Created by') {
        if (isArrowDown) {
          dispatch(setSortPackBy(sortingMethods.DES_USER_NAME));
        } else if (!isArrowDown) {
          dispatch(setSortPackBy(sortingMethods.ASC_USER_NAME));
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
  name: 'packs' | 'cards';
};
