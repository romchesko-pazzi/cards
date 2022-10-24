import React, { useState } from 'react';

import CloseIcon from '@mui/icons-material/Close';

import { deletePack } from '../../../store/thunks/thunks';
import { useAppDispatch } from '../../../utils/hooks/useSelectorUseDispatch';
import { ButtonComponent } from '../../button/ButtonComponent';
import { BaseModal } from '../BaseModal';
import common from '../BaseModal.module.scss';

import s from './deleteModal.module.scss';

export const DeleteModal: React.FC<PropsType> = ({ userId, packId, packName }) => {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const setIsOpenHandler = () => setIsOpen(!isOpen);

  const deletePackHandler = () => {
    dispatch(deletePack(packId));
  };

  return (
    <BaseModal setIsOpen={setIsOpenHandler} isOpen={isOpen} userId={userId} type="delete">
      <div className={common.heading}>
        <h3>Delete pack</h3>
        <button type="button" onClick={setIsOpenHandler}>
          <CloseIcon cursor="pointer" fontSize="large" />
        </button>
      </div>
      <div className={s.paragraphs}>
        <div>
          Do you really want to remove <b>{packName}</b>?
        </div>
        <div>All cards will be deleted.</div>
      </div>
      <div className={s.buttons}>
        <ButtonComponent title="Cancel" callback={setIsOpenHandler} />
        <ButtonComponent title="Delete" callback={deletePackHandler} color="red" />
      </div>
    </BaseModal>
  );
};

type PropsType = {
  userId: string;
  packId: string;
  packName: string;
};
