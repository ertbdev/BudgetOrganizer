import * as yup from 'yup';

export const incomeSchema = yup.object().shape({
  account: yup.string().required('account_required'),
  amount: yup.number().required('amount_required'),
  date: yup.number().required('date_required'),
  description: yup.string(),
});
