import * as yup from 'yup';

export const accountSchema = yup.object().shape({
  name: yup.string().required('account_name_required'),
  initialAmount: yup.number().required('initial_amount_required'),
});
