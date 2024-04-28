import { ValidationChain } from 'express-validator';

interface CheckOptions {
  validator: keyof ValidationChain; // Validator function name
  parameters?: any[]; // Parameters for the validator function
  message: string; // Custom error message
}

// Define interface for field checks
interface FieldCheck {
  fieldName: string; // Name of the field to be checked
  checks: CheckOptions[]; // Array of validation checks for the field
}

// Define interface for form validation configuration
interface FormValidationConfig {
  fieldChecks: FieldCheck[]; // Array of field checks
  redirectUrl: string; // URL to redirect in case of validation errors
  pageOptions: Record<string, any>; // Additional options for rendering the page
}

export { CheckOptions, FieldCheck, FormValidationConfig };
