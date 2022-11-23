import React, { useEffect, useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import CloseIcon from '@mui/icons-material/Close';
import { TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';

import { createCard, createPack } from '../../../store/thunks/thunks';
import { useAppDispatch } from '../../../utils/hooks/useSelectorUseDispatch';
import { twoFieldsValidate } from '../../../utils/validators/validators';
import { ButtonComponent } from '../../button/ButtonComponent';
import { style } from '../baseModal/BaseModal';
import c from '../commonModal.module.scss';

export const AddModal = ({ isThisPlaceCards }: { isThisPlaceCards: boolean }) => {
  const [searchParams] = useSearchParams();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    return () => {
      reset();
    };
  }, [isOpen]);

  const dispatch = useAppDispatch();

  const title = isThisPlaceCards ? 'Add new card' : 'Add new pack';
  const placeholder = isThisPlaceCards ? 'Question' : 'Enter pack name';
  const packId = searchParams.get('packId') || '';
  const setIsOpenHandler = () => setIsOpen(!isOpen);

  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm<TextFieldsType>({
    mode: 'onSubmit',
    resolver: yupResolver(twoFieldsValidate),
  });

  const onSubmit = (data: TextFieldsType) => {
    if (isThisPlaceCards) {
      dispatch(
        createCard({
          question: data.firstValue,
          answer: data.secondValue!,
          cardsPack_id: packId,
        }),
      );
    }
    if (!isThisPlaceCards) {
      dispatch(createPack(data.firstValue));
    }
    setIsOpenHandler();
    reset();
  };

  return (
    <div>
      <ButtonComponent disabled={false} callback={setIsOpenHandler} title={title} />
      <Modal open={isOpen} onClose={setIsOpenHandler}>
        <Box sx={style}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={c.heading}>
              <h3>{title}</h3>
              <button type="button" onClick={setIsOpenHandler}>
                <CloseIcon cursor="pointer" fontSize="large" />
              </button>
            </div>
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
        </Box>
      </Modal>
    </div>
  );
};

type TextFieldsType = {
  firstValue: string;
  secondValue?: string;
};
