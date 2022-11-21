import * as yup from 'yup';

import { maxNameLength, minNameLength, minPasswordLength } from '../constants/constants';

// constants
const modalValidation = yup
  .string()
  .max(maxNameLength, "Name shouldn't be more than 25 characters")
  .min(minNameLength, 'Enter name');

const emailValidation = yup
  .string()
  .email('Invalid email format')
  .required('Email is required');

const passwordValidation = yup
  .string()
  .required('Password is required')
  .min(minPasswordLength, 'Password must be more than 7 symbols');

// validators
export const signInValidate = yup.object({
  email: emailValidation,
  password: passwordValidation,
});

export const signUpValidate = yup.object({
  email: emailValidation,
  password: passwordValidation,
  confirmation: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
});

export const forgotValidate = yup.object({
  email: emailValidation,
});

export const newPasswordValidate = yup.object({
  password: passwordValidation,
});

export const twoFieldsValidate = yup.object({
  firstValue: modalValidation,
  secondValue: modalValidation,
});

export const oneFieldValidate = yup.object({
  firstValue: modalValidation,
});
