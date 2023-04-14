import * as yup from 'yup';
yup;
import YupPassword from 'yup-password';
YupPassword(yup);

export const passwordValidation = {
  minLength: 8,
  maxLength: 25,
  minLowerCase: 1,
  minUpperCase: 1,
  minNumbers: 1,
  minSymbols: 1,
};

export const signUpSchema = yup.object().shape({
  name: yup.string(),
  email: yup.string().email('email_malformed').required('email_required'),
  password: yup
    .string()
    .required('password_required')
    .min(passwordValidation.minLength, 'password_min')
    .max(passwordValidation.maxLength, 'password_max')
    .minLowercase(passwordValidation.minLowerCase, 'password_lower_case')
    .minUppercase(passwordValidation.minUpperCase, 'password_upper_case')
    .minNumbers(passwordValidation.minNumbers, 'password_number')
    .minSymbols(passwordValidation.minSymbols, 'password_special_character'),
});
