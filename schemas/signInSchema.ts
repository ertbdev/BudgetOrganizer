import * as yup from 'yup';

export const signInSchema = yup.object().shape({
  email: yup.string().email('email_malformed').required('email_required'),
  password: yup.string().required('password_required'),
});
