import * as yup from 'yup';

const NAME_VALID = yup.string().required('Please enter your name.');

const EMAIL_VALID = yup
  .string()
  .email('Please enter a valid email address.')
  .required('Please enter your email address.');

const PASSWORD_VALID_ERRORS = {
  REQUIRED: 'Please enter in Password.',
  LENGTH: 'Passwords need to be at least 8 characters.',
  LOWERCASE: 'Password should include Lower case characters (a-z).',
  UPPERCASE: 'Password should include Upper case characters (A-Z).',
  NUMBER: 'Password should include Numbers (i.e. 0-9).',
  SPECIAL: 'Password should include Special characters (i.e. !,@,#,$).'
}

const PASSWORD_VALID = yup
  .string()
  .required(PASSWORD_VALID_ERRORS.REQUIRED)
  .min(8, PASSWORD_VALID_ERRORS.LENGTH)
  .matches(/[a-z]+/, PASSWORD_VALID_ERRORS.LOWERCASE)
  .matches(/[A-Z]+/, PASSWORD_VALID_ERRORS.UPPERCASE)
  .matches(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/, PASSWORD_VALID_ERRORS.SPECIAL)
  .matches(/\d+/, PASSWORD_VALID_ERRORS.NUMBER);

const CONFIRM_PASSWORD_VALID = yup
  .string()
  .required('Please enter in Password.')
  .oneOf([yup.ref('password'), null], 'Both passwords must be the same.');

const ADDRESS_VALID = yup
  .string()
  .required('Wallet required, please connect a wallet.');

const BALANCE_VALID = yup
  .string()
  .typeError('Please enter valid balance')
  .test('balance', 'This field should be more than 0.', value => parseFloat(value) > 0)
  .required('Please input field.');

const UUID_VALID = yup
  .string()
  .matches(/^[0-9A-F]{8}-[0-9A-F]{4}-[5][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i, 'Invalid UUID');

const SELECT_VALID = yup.string().required('Please select one.');

const SELECT_OBJECT_VALID = yup.object().nullable().required('Please select one.');

const DATE_VALID = yup.string().required('Please select date.');

export {
  NAME_VALID,
  EMAIL_VALID,
  PASSWORD_VALID,
  UUID_VALID,
  CONFIRM_PASSWORD_VALID,
  BALANCE_VALID,
  ADDRESS_VALID,
  SELECT_VALID,
  SELECT_OBJECT_VALID,
  DATE_VALID,
  PASSWORD_VALID_ERRORS,
};
