import { NextFunction, Request, Response } from 'express';
import {
  check,
  validationResult,
  ValidationChain,
  ValidationError,
} from 'express-validator';
import { FormValidationConfig, FieldCheck } from '../types/Forms';
import { ALLOWED_VALIDATORS } from '../constants/FORM_VALIDATION_CHAINS';

// List of allowed validators

/**
 * Asynchronously validates the fields based on the provided checks.
 * @param fieldChecks Array of FieldCheck objects containing validation checks for each field
 * @param req Express Request object
 * @returns An array of validation errors
 */
const validateFields = async (fieldChecks: FieldCheck[], req: Request) => {
  for (const fieldCheck of fieldChecks) {
    for (const { validator, parameters, message } of fieldCheck.checks) {
      if (ALLOWED_VALIDATORS.includes(validator)) {
        // Initialize a validation chain for the current field
        let chain: ValidationChain = check(fieldCheck.fieldName);

        // Handle special case for comparing repeat password with password

        if (
          validator === 'equals' &&
          parameters &&
          parameters[0] === 'password'
        ) {
          chain = (chain[validator] as any)(req.body.password);
        } else {
          // General case for other validators
          if (parameters) {
            chain = (chain[validator] as any)(...parameters);
          } else {
            chain = (chain[validator] as any)();
          }
        }

        // Attach custom message to the validator
        if (message) {
          chain = chain.withMessage(message);
        }

        // Run validation
        await chain.run(req);
      }
    }
  }

  // Return validation errors
  return validationResult(req).array();
};

/**
 * Middleware function to validate form fields based on the provided configuration.
 * @param form_validation_config Configuration object containing field checks, redirect URL, and page options
 * @returns Express middleware function for form validation
 */
const validateForm = (form_validation_config: FormValidationConfig) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { fieldChecks, redirectUrl, pageOptions } = form_validation_config;
    // Validate fields and retrieve errors
    const errors: ValidationError[] = await validateFields(fieldChecks, req);
    // If there are validation errors, render the specified redirect URL with the errors
    if (errors.length > 0) {
      return res.render(redirectUrl, {
        ...pageOptions,
        errors,
        values: { ...req.body },
      });
    }
    // If validation passes, proceed to the next middleware
    next();
  };
};

export { validateForm };
