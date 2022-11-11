import React, { ChangeEvent, useState } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import { TextField } from '@mui/material';
import { useSearchParams } from 'react-router-dom';

import { updateCard, updatePackName } from '../../../store/thunks/thunks';
import { useAppDispatch } from '../../../utils/hooks/useSelectorUseDispatch';
import { ButtonComponent } from '../../button/ButtonComponent';
import { BaseModal } from '../baseModal/BaseModal';
import c from '../commonModal.module.scss';

export const EditModal = (props: PropsType) => {
  const { propsUserId, id, name, isThisPlaceCards, optionName } = props;
  const [firstValue, setFirstValue] = useState<string>(name);
  const [secondValue, setSecondValue] = useState<string>(optionName || '');
  const [searchParams] = useSearchParams(); // for cardsComponent
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const userId = searchParams.get('userId') || propsUserId;
  const placeholder = isThisPlaceCards ? 'Question' : 'Pack Name';

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

  const editPackHandler = () => {
    if (!isThisPlaceCards) dispatch(updatePackName(id, firstValue));
    if (isThisPlaceCards) dispatch(updateCard(firstValue, secondValue, id));
    setIsOpenHandler();
  };

  return (
    <BaseModal setIsOpen={setIsOpenHandler} isOpen={isOpen} userId={userId!} type="edit">
      <div className={c.heading}>
        <h3>Edit pack</h3>
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
            value={secondValue}
            type="text"
            placeholder="Answer"
          />
        </div>
      )}
      <div className={c.buttons}>
        <ButtonComponent
          disabled={false}
          title="Cancel"
          callback={setIsOpenHandler}
          color="red"
        />
        <ButtonComponent disabled={false} title="Save" callback={editPackHandler} />
      </div>
    </BaseModal>
  );
};

type PropsType = {
  propsUserId?: string; // for PackComponent
  optionName?: string;
  id: string;
  name: string;
  isThisPlaceCards: boolean;
};
