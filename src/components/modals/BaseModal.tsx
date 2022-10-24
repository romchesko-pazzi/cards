import * as React from 'react';
import { ReactNode } from 'react';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

import s from '../../pages/pack/pack.module.scss';
import { useAppSelector } from '../../utils/hooks/useSelectorUseDispatch';
import { SvgSelector } from '../svgSelector/SvgSelector';

export const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius: '1rem',
};

export const BaseModal = ({ children, userId, type, isOpen, setIsOpen }: PropsType) => {
  // for disable actions (delete pack, change name)
  const userIdFromProfile = useAppSelector(state => state.profile._id);
  const btnDisabledStyle = userIdFromProfile !== userId ? s.btnDisabled : '';
  const isButtonDisabled = userIdFromProfile !== userId;

  const openCloseModalHandler = () => setIsOpen();

  return (
    <>
      {type === 'delete' ? (
        <button
          onClick={openCloseModalHandler}
          className={btnDisabledStyle}
          disabled={isButtonDisabled}
          type="button"
        >
          <SvgSelector id="trash" />
        </button>
      ) : (
        <button
          onClick={openCloseModalHandler}
          className={btnDisabledStyle}
          disabled={isButtonDisabled}
          type="button"
        >
          <SvgSelector id="edit" />
        </button>
      )}
      <Modal open={isOpen} onClose={openCloseModalHandler}>
        <Box sx={style}>{children}</Box>
      </Modal>
    </>
  );
};

type PropsType = {
  children: ReactNode;
  userId: string;
  type: string;
  isOpen: boolean;
  setIsOpen: () => void;
};
