import React, {useEffect, useState} from 'react';

import {Alert, Keyboard} from 'react-native';

import MainContainer from '../components/common/MainContainer';
import {Container, RowContainer} from '../styles/styledComponents/containers';
import TextInput from '../components/common/TextInput';
import ScreenHeader from '../components/ScreenHeader';
import KeyboardAvoidanceContainer from '../components/common/KeyboardAvoidanceContainer';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types/navigation';
import {useTheme} from 'styled-components';

import {FontAwesome, FontAwesome5, MaterialCommunityIcons} from '@expo/vector-icons';
import Button from '../components/common/Button';
import AccountsModal from '../components/AccountsModal';
import {useFormik} from 'formik';
import dayjs from 'dayjs';
import CategoriesModal from '../components/CategoriesModal';
import {useAppDispatch, useAppSelector} from '../hooks/redux';
import {addNewExpense, editExpense, removeExpense} from '../redux/budgetSlice';
import {expenseSchema} from '../schemas/expenseSchema';
import {DateTimePickerEvent, DateTimePickerAndroid} from '@react-native-community/datetimepicker';
import {Expense} from '../models/expense';
import Text from '../components/common/Text';

type Props = NativeStackScreenProps<RootStackParamList, 'AddExpenseScreen'>;

const AddExpenseScreen = ({navigation, route}: Props) => {
  const {palette} = useTheme();

  const oldData = route.params.id
    ? useAppSelector(state => state.budgetSlice.monthlyExpenses.find(expense => expense.id === route.params.id))
    : undefined;

  const [showAccountsModal, setShowAccountsModal] = useState(false);
  const [showCategoriesModal, setShowCategoriesModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(false);

  const dispatch = useAppDispatch();

  const handleGoBackPress = () => {
    navigation.pop(2);
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
    DateTimePickerAndroid.open({value: new Date(values.date), mode: 'date', onChange: handleSetDate});
  };

  const handleToggleEditMode = () => {
    setEdit(value => !value);
  };

  const handleDeletePress = () =>
    Alert.alert(
      'Delete Expense',
      'Are you sure you want to delete this expense?',
      [
        {text: 'Delete', onPress: handleDeleteExpense, style: 'destructive'},
        {text: 'Cancel', style: 'cancel'},
      ],
      {cancelable: true},
    );

  const handleDeleteExpense = async () => {
    setLoading(true);
    oldData?.id && (await dispatch(removeExpense(oldData.id)));
    setLoading(false);
    handleGoBackPress();
  };

  const handleSave = async () => {
    setLoading(true);
    const expense: Expense = {
      description: values.description,
      account: values.account,
      category: values.category,
      amount: +values.amount,
      date: values.date,
    };
    if (oldData) {
      await dispatch(editExpense({...expense, id: oldData.id}));
    } else {
      await dispatch(addNewExpense(expense));
    }
    setLoading(false);
    handleGoBackPress();
  };

  const {setFieldValue, handleChange, handleSubmit, handleBlur, values, errors, touched} = useFormik({
    validationSchema: expenseSchema,
    initialValues: {account: '', amount: '', date: new Date().getTime(), description: '', category: ''},
    onSubmit: handleSave,
  });

  useEffect(() => {
    if (oldData) {
      setFieldValue('account', oldData.account);
      setFieldValue('amount', oldData.amount);
      setFieldValue('category', oldData.category);
      setFieldValue('date', oldData.date);
      setFieldValue('description', oldData.description);
    }
  }, [oldData]);

  return (
    <MainContainer justifyContent="flex-start">
      <ScreenHeader title={oldData ? (edit ? 'Edit Expense' : 'Expense') : 'Add Expense'} onBackPress={handleGoBackPress} />
      <KeyboardAvoidanceContainer>
        <Container>
          {Boolean(oldData) ? (
            <RowContainer variant="full-width" justifyContent="flex-end" pr={40}>
              <Button mode="text" mr={20} onPress={handleDeletePress}>
                <FontAwesome5 name="trash" size={24} color={palette.error.light} />
              </Button>
              <Button mode="text" onPress={handleToggleEditMode}>
                <MaterialCommunityIcons name={edit ? 'pencil-off' : 'pencil'} size={30} />
              </Button>
            </RowContainer>
          ) : null}
          {/* <Entypo name="add-to-list" size={40} color={palette.gray[800]} />
          <Text>Add receipt</Text> */}
        </Container>

        <Container variant="full-width">
          <TextInput
            placeholder="Description"
            value={values.description}
            onChangeText={handleChange('description')}
            onBlur={handleBlur('description')}
            error={touched.description && Boolean(errors.description)}
            width={'90%'}
            editable={!Boolean(oldData) || edit}
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
            editable={!Boolean(oldData) || edit}
            left={<FontAwesome5 name="money-bill-wave" size={22} color={palette.gray[500]} />}
            right={
              <Text variant="subtitle2" color={palette.gray[500]}>
                zł
              </Text>
            }
          />
          <TextInput
            placeholder="Account"
            value={values.account}
            onBlur={handleBlur('account')}
            error={touched.account && Boolean(errors.account)}
            width={'90%'}
            editable={!Boolean(oldData) || edit}
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
            editable={!Boolean(oldData) || edit}
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
            editable={!Boolean(oldData) || edit}
            showSoftInputOnFocus={false}
            onFocus={handleDatePress}
            left={<FontAwesome name="calendar" size={25} color={palette.gray[500]} />}
          />
        </Container>

        <Button loading={loading} disabled={Boolean(oldData) && !edit} minWidth={'40%'} onPress={handleSubmit}>
          Save
        </Button>
      </KeyboardAvoidanceContainer>

      <AccountsModal showModal={showAccountsModal} onAccountPress={handleSetAccount} onClosePress={handleCloseAccountsModal} />

      <CategoriesModal showModal={showCategoriesModal} onItemPress={handleSetCategory} onClosePress={handleCloseCategoriesModal} />
    </MainContainer>
  );
};

export default AddExpenseScreen;
