import React, {useRef, useState} from 'react';

import {Keyboard, TextInput as RNTextInput} from 'react-native';

import MainContainer from '../components/common/MainContainer';
import Text from '../components/common/Text';
import {Container, RowContainer} from '../styles/styledComponents/containers';
import TextInput from '../components/common/TextInput';
import ScreenHeader from '../components/ScreenHeader';
import KeyboardAvoidanceContainer from '../components/common/KeyboardAvoidanceContainer';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types/navigation';
import {useTheme} from 'styled-components';

import {FontAwesome, FontAwesome5} from '@expo/vector-icons';
import Button from '../components/common/Button';
import {Card} from '../styles/styledComponents/card';
import AccountsModal from '../components/AccountsModal';
import {useFormik} from 'formik';
import dayjs from 'dayjs';
import CategoriesModal from '../components/CategoriesModal';

type Props = NativeStackScreenProps<RootStackParamList, 'AddExpenseScreen'>;

const AddExpenseScreen = ({navigation}: Props) => {
  const {palette} = useTheme();

  const [showAccountsModal, setShowAccountsModal] = useState(false);
  const [showCategoriesModal, setShowCategoriesModal] = useState(false);

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

  const handleDatePress = () => {
    Keyboard.dismiss();
  };

  const handleAddExpense = () => {
    // TODO
  };

  const {setFieldValue, handleChange, handleSubmit, handleBlur, values, errors, touched} = useFormik({
    // validationSchema: signInSchema,
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

        <Container>
          <TextInput
            placeholder="Description"
            value={values.description}
            onChangeText={handleChange('description')}
            onBlur={handleBlur('description')}
            error={Boolean(errors.description)}
            width={'90%'}
            left={<FontAwesome name="pencil-square-o" size={25} color={palette.gray[500]} />}
          />
          <TextInput
            placeholder="Amount"
            value={values.amount}
            onChangeText={handleChange('amount')}
            onBlur={handleBlur('amount')}
            error={Boolean(errors.amount)}
            keyboardType="numeric"
            width={'90%'}
            left={<FontAwesome5 name="money-bill-wave" size={22} color={palette.gray[500]} />}
          />
          <TextInput
            placeholder="Account"
            value={values.account}
            onBlur={handleBlur('account')}
            error={Boolean(errors.account)}
            width={'90%'}
            showSoftInputOnFocus={false}
            onFocus={handleAccountPress}
            left={<FontAwesome name="bank" size={25} color={palette.gray[500]} />}
          />

          <TextInput
            placeholder="Category"
            value={values.category}
            onBlur={handleBlur('category')}
            error={Boolean(errors.category)}
            width={'90%'}
            showSoftInputOnFocus={false}
            onFocus={handleCategoryPress}
            left={<FontAwesome5 name="shapes" size={25} color={palette.gray[500]} />}
          />

          <TextInput
            placeholder="Date"
            value={dayjs(values.date).format('DD.MMM YYYY (HH:mm)')}
            onBlur={handleBlur('date')}
            error={Boolean(errors.date)}
            width={'90%'}
            showSoftInputOnFocus={false}
            onFocus={handleDatePress}
            left={<FontAwesome name="calendar" size={25} color={palette.gray[500]} />}
          />
        </Container>

        <Container>
          <Button>Save</Button>
        </Container>
      </KeyboardAvoidanceContainer>

      <AccountsModal showModal={showAccountsModal} onAccountPress={handleSetAccount} onClosePress={handleCloseAccountsModal} />

      <CategoriesModal showModal={showCategoriesModal} onItemPress={handleSetCategory} onClosePress={handleCloseCategoriesModal} />
    </MainContainer>
  );
};

export default AddExpenseScreen;
