import { ValidationChain } from 'express-validator';
import { FormValidationConfig } from '../types/Forms';
import { LOGIN_PAGE, REGISTER_PAGE } from './PAGE_OPTIONS';

/**
 * express-validator allowed functions
 */
const ALLOWED_VALIDATORS: (keyof ValidationChain)[] = [
  'notEmpty',
  'isEmail',
  'isLength',
  'equals',
];

/**
 * Form validation config for Register form
 */
const REGISTER_FORM_VALIDATION: FormValidationConfig = {
  fieldChecks: [
    {
      fieldName: 'name',
      checks: [
        {
          validator: 'notEmpty' as keyof ValidationChain,
          message: '* Name cant be empty',
        },
      ],
    },
    {
      fieldName: 'username',
      checks: [
        {
          validator: 'notEmpty' as keyof ValidationChain,
          message: '* Username cant be empty',
        },
      ],
    },
    {
      fieldName: 'email',
      checks: [
        {
          validator: 'notEmpty' as keyof ValidationChain,
          message: '* Email cant be empty',
        },
        {
          validator: 'isEmail' as keyof ValidationChain,
          message: '* Enter a valid e-mail',
        },
      ],
    },
    {
      fieldName: 'password',
      checks: [
        {
          validator: 'notEmpty' as keyof ValidationChain,
          message: '* Password cant be empty',
        },
        {
          validator: 'isLength' as keyof ValidationChain,
          parameters: [{ min: 6 }],
          message: '* Password must be at least 6 characters long',
        },
      ],
    },
    {
      fieldName: 'repeatPassword',
      checks: [
        {
          validator: 'equals' as keyof ValidationChain,
          parameters: ['password'],
          message: '* Password does not match',
        },
      ],
    },
  ],

  redirectUrl: 'auth/register',
  pageOptions: {
    ...REGISTER_PAGE,
  },
};

/**
 * Form validation config for Login form
 */
const LOGIN_FORM_VALIDATION: any = {
  fieldChecks: [
    {
      fieldName: 'email',
      checks: [
        {
          validator: 'notEmpty' as keyof ValidationChain,
          message: '* Email cant be empty',
        },
        {
          validator: 'isEmail' as keyof ValidationChain,
          message: '* Enter a valid e-mail',
        },
      ],
    },
    {
      fieldName: 'password',
      checks: [
        {
          validator: 'notEmpty' as keyof ValidationChain,
          message: '* Password cant be empty',
        },
        {
          validator: 'isLength' as keyof ValidationChain,
          parameters: [{ min: 6 }],
          message: '* Password must be at least 6 characters long',
        },
      ],
    },
  ],
  redirectUrl: 'auth/login',
  pageOptions: {
    ...LOGIN_PAGE,
  },
};

export { REGISTER_FORM_VALIDATION, LOGIN_FORM_VALIDATION, ALLOWED_VALIDATORS };
