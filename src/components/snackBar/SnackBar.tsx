import React from 'react';

import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

import { setPopUp } from '../../store/reducers/AppReducer';
import { useAppDispatch, useAppSelector } from '../../utils/hooks/useSelectorUseDispatch';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const SnackBar = () => {
  const notification = useAppSelector(state => state.app.notification);
  const error = useAppSelector(state => state.app.isError);
  const dispatch = useAppDispatch();

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string): void => {
    if (reason === 'clickaway') {
      dispatch(setPopUp(''));
    }
    dispatch(setPopUp(''));
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      open={!!notification}
      autoHideDuration={2500}
      onClose={handleClose}
    >
      <Alert
        sx={{ fontSize: '1.4rem', fontFamily: 'inherit' }}
        onClose={handleClose}
        severity={error ? 'error' : 'success'}
      >
        {notification}
      </Alert>
    </Snackbar>
  );
};
