import React, { ChangeEvent, KeyboardEvent, useState } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import { TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

import { createPack } from '../../../store/thunks/thunks';
import { useAppDispatch } from '../../../utils/hooks/useSelectorUseDispatch';
import { ButtonComponent } from '../../button/ButtonComponent';
import { style } from '../BaseModal';
import common from '../BaseModal.module.scss';
import s from '../editModal/editModal.module.scss';

export const AddModal = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');

  const dispatch = useAppDispatch();

  const setIsOpenHandler = () => setIsOpen(!isOpen);
  const onChangeHandler = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setValue(event.currentTarget.value);
  };
  const createPackHandler = () => {
    dispatch(createPack(value));
    setIsOpenHandler();
    setValue('');
  };

  const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      createPackHandler();
    }
  };

  return (
    <div>
      <ButtonComponent callback={setIsOpenHandler} title="Add new pack" />
      <Modal open={isOpen} onClose={setIsOpenHandler}>
        <Box sx={style}>
          <div className={common.heading}>
            <h3>Add new pack</h3>
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
              onKeyUp={onKeyPressHandler}
              value={value}
              type="text"
            />
          </div>
          <div className={s.buttons}>
            <ButtonComponent title="Cancel" callback={setIsOpenHandler} color="red" />
            <ButtonComponent title="Save" callback={createPackHandler} />
          </div>
        </Box>
      </Modal>
    </div>
  );
};
