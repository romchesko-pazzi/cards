import React from 'react';

import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

import { setError } from '../../store/reducers/AppReducer';
import { useAppDispatch, useAppSelector } from '../../utils/hooks/hooks';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const SnackBar = () => {
  const notification = useAppSelector(state => state.app.notification);
  const dispatch = useAppDispatch();

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string): void => {
    if (reason === 'clickaway') {
      dispatch(setError(''));
    }
    dispatch(setError(''));
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      open={!!notification}
      autoHideDuration={4000}
      onClose={handleClose}
    >
      <Alert
        sx={{ fontSize: '1.4rem', fontFamily: 'inherit' }}
        onClose={handleClose}
        severity="error"
      >
        {notification}
      </Alert>
    </Snackbar>
  );
};
