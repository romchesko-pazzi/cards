import React, { ChangeEvent, KeyboardEvent, useState } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import { TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useSearchParams } from 'react-router-dom';

import { createCard, createPack } from '../../../store/thunks/thunks';
import { useAppDispatch } from '../../../utils/hooks/useSelectorUseDispatch';
import { ButtonComponent } from '../../button/ButtonComponent';
import { style } from '../baseModal/BaseModal';
import c from '../commonModal.module.scss';

export const AddModal = ({ isThisPlaceCards }: { isThisPlaceCards: boolean }) => {
  const [searchParams] = useSearchParams();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [firstValue, setFirstValue] = useState<string>('');
  const [secondValue, setSecondValue] = useState<string>('');

  const dispatch = useAppDispatch();

  const title = isThisPlaceCards ? 'Add new card' : 'Add new pack';
  const placeholder = isThisPlaceCards ? 'Question' : 'Enter pack name';
  const packId = searchParams.get('packId') || '';
  const setIsOpenHandler = () => setIsOpen(!isOpen);

  const onFirstInputChangeHandler = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFirstValue(event.currentTarget.value);
  };
  const onSecondInputChangeHandler = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setSecondValue(event.currentTarget.value);
  };

  const createHandler = () => {
    if (isThisPlaceCards) {
      dispatch(
        createCard({ question: firstValue, answer: secondValue, cardsPack_id: packId }),
      );
    }
    if (!isThisPlaceCards) {
      dispatch(createPack(firstValue));
    }
    setIsOpenHandler();
    setFirstValue('');
    setSecondValue('');
  };

  const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      createHandler();
    }
  };

  return (
    <div>
      <ButtonComponent callback={setIsOpenHandler} title={title} />
      <Modal open={isOpen} onClose={setIsOpenHandler}>
        <Box sx={style}>
          <div className={c.heading}>
            <h3>{title}</h3>
            <button type="button" onClick={setIsOpenHandler}>
              <CloseIcon cursor="pointer" fontSize="large" />
            </button>
          </div>
          <div className={c.input}>
            <TextField
              InputProps={{ className: c.textField }}
              sx={{ minWidth: '100%' }}
              autoFocus
              variant="standard"
              onChange={onFirstInputChangeHandler}
              onKeyUp={onKeyPressHandler}
              value={firstValue}
              type="text"
              placeholder={placeholder}
            />
          </div>
          {isThisPlaceCards && (
            <div className={c.secondInput}>
              <TextField
                InputProps={{ className: c.textField }}
                sx={{ minWidth: '100%' }}
                autoFocus
                variant="standard"
                onChange={onSecondInputChangeHandler}
                onKeyUp={onKeyPressHandler}
                value={secondValue}
                type="text"
                placeholder="Answer"
              />
            </div>
          )}
          <div className={c.buttons}>
            <ButtonComponent title="Cancel" callback={setIsOpenHandler} color="red" />
            <ButtonComponent title="Save" callback={createHandler} />
          </div>
        </Box>
      </Modal>
    </div>
  );
};
