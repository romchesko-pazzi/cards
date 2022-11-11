import React, { useState } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import { useSearchParams } from 'react-router-dom';

import { deleteCard, deletePack } from '../../../store/thunks/thunks';
import { useAppDispatch } from '../../../utils/hooks/useSelectorUseDispatch';
import { ButtonComponent } from '../../button/ButtonComponent';
import { BaseModal } from '../baseModal/BaseModal';
import c from '../commonModal.module.scss';

export const DeleteModal: React.FC<PropsType> = props => {
  const { propsUserId, id, name, isThisPlaceCards } = props;
  const [searchParams] = useSearchParams(); // for cardsComponent
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const userId = searchParams.get('userId') || propsUserId;

  const setIsOpenHandler = () => setIsOpen(!isOpen);

  const deletePackHandler = () => {
    if (!isThisPlaceCards) dispatch(deletePack(id));
    if (isThisPlaceCards) dispatch(deleteCard(id));
    setIsOpenHandler();
  };

  return (
    <BaseModal
      setIsOpen={setIsOpenHandler}
      isOpen={isOpen}
      userId={userId!}
      type="delete"
    >
      <div className={c.heading}>
        <h3>Delete pack</h3>
        <button type="button" onClick={setIsOpenHandler}>
          <CloseIcon cursor="pointer" fontSize="large" />
        </button>
      </div>
      <div className={c.paragraphs}>
        <div>
          Do you really want to remove <b>{name}</b>?
        </div>
        <div>All data will be deleted.</div>
      </div>
      <div className={c.buttons}>
        <ButtonComponent disabled={false} title="Cancel" callback={setIsOpenHandler} />
        <ButtonComponent
          disabled={false}
          title="Delete"
          callback={deletePackHandler}
          color="red"
        />
      </div>
    </BaseModal>
  );
};

type PropsType = {
  id: string;
  propsUserId?: string; // for PackComponent
  name: string;
  isThisPlaceCards: boolean;
};
