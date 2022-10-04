import * as yup from 'yup';

import { minPasswordLength } from '../constants';

export const signUpValidate = yup.object().shape({
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(minPasswordLength, 'Password must be more than 7 symbols'),
  confirmation: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
});

export const signInValidate = yup.object().shape({
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(minPasswordLength, 'Password must be more than 7 symbols'),
});
