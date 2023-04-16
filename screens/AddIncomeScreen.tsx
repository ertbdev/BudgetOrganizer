import React, {useState} from 'react';

import {Keyboard} from 'react-native';

import MainContainer from '../components/common/MainContainer';
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
import {useAppDispatch} from '../hooks/redux';
import {DateTimePickerEvent, DateTimePickerAndroid} from '@react-native-community/datetimepicker';
import {incomeSchema} from '../schemas/incomeSchema';
import {Income} from '../models/income';
import {addNewIncome} from '../redux/budgetSlice';

type Props = NativeStackScreenProps<RootStackParamList, 'AddIncomeScreen'>;

const AddIncomeScreen = ({navigation}: Props) => {
  const {palette} = useTheme();

  const [showAccountsModal, setShowAccountsModal] = useState(false);
  const [loading, setLoading] = useState(false);

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

  const handleSetDate = (event: DateTimePickerEvent, date?: Date) => {
    date && setFieldValue('date', date.getTime());
  };

  const handleDatePress = () => {
    Keyboard.dismiss();
    DateTimePickerAndroid.open({value: new Date(), mode: 'date', onChange: handleSetDate});
  };

  const handleAddExpense = async () => {
    setLoading(true);
    const income: Income = {
      description: values.description,
      account: values.account,
      amount: +values.amount,
      date: values.date,
    };
    await dispatch(addNewIncome(income));
    setLoading(false);
    handleGoBackPress();
  };

  const {setFieldValue, handleChange, handleSubmit, handleBlur, values, errors, touched} = useFormik({
    validationSchema: incomeSchema,
    initialValues: {account: '', amount: '', date: new Date().getTime(), description: ''},
    onSubmit: handleAddExpense,
  });

  return (
    <MainContainer justifyContent="flex-start">
      <ScreenHeader title="Add Income" onBackPress={handleGoBackPress} />
      <KeyboardAvoidanceContainer>
        <Container>
          {/* <Text>add receipt</Text>
          <FontAwesome5 name="receipt" size={40} color={palette.gray[800]} /> */}
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
    </MainContainer>
  );
};

export default AddIncomeScreen;
