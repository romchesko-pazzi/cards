import React, { useEffect, useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import CloseIcon from '@mui/icons-material/Close';
import { TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';

import { updateCard, updatePackName } from '../../../store/thunks/thunks';
import { useAppDispatch } from '../../../utils/hooks/useSelectorUseDispatch';
import {
  oneFieldValidate,
  twoFieldsValidate,
} from '../../../utils/validators/validators';
import { ButtonComponent } from '../../button/ButtonComponent';
import { BaseModal } from '../baseModal/BaseModal';
import c from '../commonModal.module.scss';

export const EditModal = (props: PropsType) => {
  const { propsUserId, id, name, isThisPlaceCards, optionName } = props;
  const [searchParams] = useSearchParams(); // for cardsComponent
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    return () => {
      reset();
    };
  }, [isOpen]);

  const userId = searchParams.get('userId') || propsUserId;
  const placeholder = isThisPlaceCards ? 'Question' : 'Pack Name';

  const setIsOpenHandler = () => setIsOpen(!isOpen);
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm<TextFieldsType>({
    mode: 'onSubmit',
    resolver: yupResolver(isThisPlaceCards ? twoFieldsValidate : oneFieldValidate),
    defaultValues: {
      firstValue: name,
      secondValue: optionName || '',
    },
  });

  const onSubmit = (data: TextFieldsType) => {
    if (!isThisPlaceCards) dispatch(updatePackName(id, data.firstValue));
    if (isThisPlaceCards) dispatch(updateCard(data.firstValue, data.secondValue!, id));
    setIsOpenHandler();
    reset();
  };

  return (
    <BaseModal setIsOpen={setIsOpenHandler} isOpen={isOpen} userId={userId!} type="edit">
      <div className={c.heading}>
        <h3>Edit pack</h3>
        <button type="button" onClick={setIsOpenHandler}>
          <CloseIcon cursor="pointer" fontSize="large" />
        </button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={c.input}>
          <TextField
            {...register('firstValue')}
            error={!!errors.firstValue?.message}
            label={errors.firstValue?.message}
            InputProps={{ className: c.textField }}
            InputLabelProps={{ className: c.labelText }}
            sx={{ minWidth: '100%' }}
            autoFocus
            variant="standard"
            type="text"
            placeholder={placeholder}
          />
        </div>
        {isThisPlaceCards && (
          <div className={c.secondInput}>
            <TextField
              {...register('secondValue')}
              error={!!errors.secondValue?.message}
              label={errors.secondValue?.message}
              InputProps={{ className: c.textField }}
              InputLabelProps={{ className: c.labelText }}
              sx={{ minWidth: '100%' }}
              autoFocus
              variant="standard"
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
          <ButtonComponent type="submit" disabled={false} title="Save" />
        </div>
      </form>
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

type TextFieldsType = {
  firstValue: string;
  secondValue?: string;
};
