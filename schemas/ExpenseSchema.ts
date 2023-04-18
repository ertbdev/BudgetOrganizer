import * as yup from 'yup';

export const expenseSchema = yup.object().shape({
  account: yup.string().required('account_required'),
  amount: yup.number().required('amount_required'),
  date: yup.number().required('date_required'),
  description: yup.string().required('description_required'),
  category: yup.string().required('category_required'),
});
