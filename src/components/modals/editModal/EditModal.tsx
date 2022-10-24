import React, { ChangeEvent, useState } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import { TextField } from '@mui/material';

import { updatePackName } from '../../../store/thunks/thunks';
import { useAppDispatch } from '../../../utils/hooks/useSelectorUseDispatch';
import { ButtonComponent } from '../../button/ButtonComponent';
import { BaseModal } from '../BaseModal';
import common from '../BaseModal.module.scss';

import s from './editModal.module.scss';

export const EditModal: React.FC<PropsType> = ({ userId, packId, packName }) => {
  const [value, setValue] = useState<string>(packName);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const setIsOpenHandler = () => setIsOpen(!isOpen);

  const onChangeHandler = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setValue(event.currentTarget.value);
  };

  const editPackHandler = () => {
    dispatch(updatePackName(packId, value));
    setIsOpenHandler();
  };

  return (
    <BaseModal setIsOpen={setIsOpenHandler} isOpen={isOpen} userId={userId} type="edit">
      <div className={common.heading}>
        <h3>Edit pack</h3>
        <button type="button" onClick={setIsOpenHandler}>
          <CloseIcon cursor="pointer" fontSize="large" />
        </button>
      </div>
      <div className={s.input}>
        <TextField
          InputProps={{ className: s.textField }}
          sx={{ minWidth: '100%' }}
          autoFocus
          variant="standard"
          onChange={onChangeHandler}
          value={value}
          type="text"
        />
      </div>
      <div className={s.buttons}>
        <ButtonComponent title="Cancel" callback={setIsOpenHandler} color="red" />
        <ButtonComponent title="Save" callback={editPackHandler} />
      </div>
    </BaseModal>
  );
};

type PropsType = {
  userId: string;
  packId: string;
  packName: string;
};
