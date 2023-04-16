import React, {useState} from 'react';

import {Keyboard, View} from 'react-native';

import MainContainer from '../components/common/MainContainer';
import Text from '../components/common/Text';
import {Container} from '../styles/styledComponents/containers';
import TextInput from '../components/common/TextInput';
import ScreenHeader from '../components/ScreenHeader';
import KeyboardAvoidanceContainer from '../components/common/KeyboardAvoidanceContainer';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types/navigation';
import {useTheme} from 'styled-components';

import {FontAwesome, FontAwesome5} from '@expo/vector-icons';
import Button from '../components/common/Button';
import AccountsModal from '../components/AccountsModal';
import {useFormik} from 'formik';
import dayjs from 'dayjs';
import CategoriesModal from '../components/CategoriesModal';
import {useAppDispatch} from '../hooks/redux';
import {addNewExpense} from '../redux/budgetSlice';
import {expenseSchema} from '../schemas/ExpenseSchema';
import {DateTimePickerEvent, DateTimePickerAndroid} from '@react-native-community/datetimepicker';
import {locale} from 'expo-localization';
import {Expense} from '../models/expense';

type Props = NativeStackScreenProps<RootStackParamList, 'AddExpenseScreen'>;

const AddExpenseScreen = ({navigation}: Props) => {
  const {palette} = useTheme();

  const [showAccountsModal, setShowAccountsModal] = useState(false);
  const [showCategoriesModal, setShowCategoriesModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch();

  const handleGoBackPress = () => {
    navigation.goBack();
  };

  const handleAccountPress = () => {
    Keyboard.dismiss();
    setShowAccountsModal(true);
  };

  const handleCloseAccountsModal = () => {
    setShowAccountsModal(false);
  };

  const handleSetAccount = (account: string) => {
    setFieldValue('account', account);
    handleCloseAccountsModal();
  };

  const handleCategoryPress = () => {
    Keyboard.dismiss();
    setShowCategoriesModal(true);
  };

  const handleCloseCategoriesModal = () => {
    setShowCategoriesModal(false);
  };

  const handleSetCategory = (category: string) => {
    setFieldValue('category', category);
    handleCloseCategoriesModal();
  };

  const handleSetDate = (event: DateTimePickerEvent, date?: Date) => {
    date && setFieldValue('date', date.getTime());
  };

  const handleDatePress = () => {
    Keyboard.dismiss();
    DateTimePickerAndroid.open({value: new Date(), mode: 'date', onChange: handleSetDate});
  };

  const handleAddExpense = async () => {
    setLoading(true);
    const expense: Expense = {
      description: values.description,
      account: values.account,
      category: values.category,
      amount: +values.amount,
      date: values.date,
    };
    await dispatch(addNewExpense(expense));
    setLoading(false);
    handleGoBackPress();
  };

  const {setFieldValue, handleChange, handleSubmit, handleBlur, values, errors, touched} = useFormik({
    validationSchema: expenseSchema,
    initialValues: {account: '', amount: '', date: new Date().getTime(), description: '', category: ''},
    onSubmit: handleAddExpense,
  });

  return (
    <MainContainer justifyContent="flex-start">
      <ScreenHeader title="Add Expense" onBackPress={handleGoBackPress} />
      <KeyboardAvoidanceContainer>
        <Container>
          <Text>add receipt</Text>
          <FontAwesome5 name="receipt" size={40} color={palette.gray[800]} />
        </Container>

        <Container variant="full-width">
          <TextInput
            placeholder="Description"
            value={values.description}
            onChangeText={handleChange('description')}
            onBlur={handleBlur('description')}
            error={touched.description && Boolean(errors.description)}
            width={'90%'}
            left={<FontAwesome name="pencil-square-o" size={25} color={palette.gray[500]} />}
          />
          <TextInput
            placeholder="Amount"
            value={values.amount.toString()}
            onChangeText={handleChange('amount')}
            onBlur={handleBlur('amount')}
            error={touched.amount && Boolean(errors.amount)}
            keyboardType="numeric"
            width={'90%'}
            left={<FontAwesome5 name="money-bill-wave" size={22} color={palette.gray[500]} />}
          />
          <TextInput
            placeholder="Account"
            value={values.account}
            onBlur={handleBlur('account')}
            error={touched.account && Boolean(errors.account)}
            width={'90%'}
            showSoftInputOnFocus={false}
            onFocus={handleAccountPress}
            left={<FontAwesome name="bank" size={25} color={palette.gray[500]} />}
          />

          <TextInput
            placeholder="Category"
            value={values.category}
            onBlur={handleBlur('category')}
            error={touched.category && Boolean(errors.category)}
            width={'90%'}
            showSoftInputOnFocus={false}
            capitalize
            onFocus={handleCategoryPress}
            left={<FontAwesome5 name="shapes" size={25} color={palette.gray[500]} />}
          />

          <TextInput
            placeholder="Date"
            value={dayjs(values.date).format('DD MMMM YYYY')}
            onBlur={handleBlur('date')}
            error={touched.date && Boolean(errors.date)}
            width={'90%'}
            showSoftInputOnFocus={false}
            onFocus={handleDatePress}
            left={<FontAwesome name="calendar" size={25} color={palette.gray[500]} />}
          />
        </Container>

        <Button loading={loading} minWidth={'40%'} onPress={handleSubmit}>
          Save
        </Button>
      </KeyboardAvoidanceContainer>

      <AccountsModal showModal={showAccountsModal} onAccountPress={handleSetAccount} onClosePress={handleCloseAccountsModal} />

      <CategoriesModal showModal={showCategoriesModal} onItemPress={handleSetCategory} onClosePress={handleCloseCategoriesModal} />
    </MainContainer>
  );
};

export default AddExpenseScreen;
