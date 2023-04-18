import React, {useState} from 'react';

import MainContainer from '../../components/common/MainContainer';
import {Container, RowContainer} from '../../styles/styledComponents/containers';
import TextInput from '../../components/common/TextInput';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import {useTheme} from 'styled-components/native';
import Text from '../../components/common/Text';
import Button from '../../components/common/Button';
import i18n from '../../assets/locale/i18n';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../types/navigation';
import {useFormik} from 'formik';
import {signUpSchema} from '../../schemas/signUpSchema';
import {useAuthContext} from '../../providers/AuthProvider';

type Props = NativeStackScreenProps<RootStackParamList, 'SignUpScreen'>;

const SignInScreen = ({navigation}: Props) => {
  const {palette} = useTheme();

  const {signUpUser} = useAuthContext();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [backendError, setBackendError] = useState<string>();

  const toggleShowPassword = () => {
    setShowPassword(value => !value);
  };

  const handleSignInPress = () => {
    navigation.replace('SignInScreen');
  };

  const handleSignIn = async () => {
    setLoading(true);
    try {
      await signUpUser(values.email, values.password);
    } catch (err) {
      const error = (err as string).split('/')[1].replace(/-/g, '_');
      setBackendError(error);
    }
    setLoading(false);
  };

  const handleChangeEmail = (value: string) => {
    backendError && setBackendError(undefined);
    setFieldValue('email', value);
  };

  const {setFieldValue, handleChange, handleSubmit, handleBlur, values, errors, touched} = useFormik({
    validationSchema: signUpSchema,
    initialValues: {name: '', email: '', password: ''},
    onSubmit: handleSignIn,
  });

  return (
    <MainContainer pb={20} justifyContent="space-around" variant="keyboard-avoidance">
      <Container h={150} justifyContent="center">
        <Icon name="lock" size={70} color={palette.primary.main} />
      </Container>

      <Container variant="full-width">
        <TextInput
          label={`${i18n.t('name')}:`}
          placeholder={i18n.t('enter_name')}
          value={values.name}
          onChangeText={handleChange('name')}
          onBlur={handleBlur('name')}
          error={touched.name && errors.name ? i18n.t('errors.' + errors.name) : undefined}
          width={'90%'}
          keyboardType="default"
          left={<Icon name="account-outline" size={25} color={palette.gray[500]} />}
        />

        <TextInput
          label={`${i18n.t('email_address')}:`}
          placeholder={i18n.t('enter_email_address')}
          value={values.email}
          onChangeText={handleChangeEmail}
          onBlur={handleBlur('email')}
          error={touched.email && errors.email ? i18n.t('errors.' + errors.email) : undefined}
          width={'90%'}
          keyboardType="email-address"
          left={<Icon name="at" size={25} color={palette.gray[500]} />}
        />

        <TextInput
          label={`${i18n.t('password')}:`}
          placeholder={i18n.t('enter_password')}
          value={values.password}
          onChangeText={handleChange('password')}
          onBlur={handleBlur('password')}
          error={touched.password && errors.password ? i18n.t('errors.' + errors.password) : undefined}
          secureTextEntry={!showPassword}
          width={'90%'}
          left={<Icon name="lock" size={25} color={palette.gray[500]} />}
          right={<Icon name={showPassword ? 'eye-off' : 'eye'} size={25} color={palette.gray[500]} />}
          onRightPress={toggleShowPassword}
        />

        {backendError ? <Text color={palette.error.main}>{i18n.t(`errors.${backendError}`)}</Text> : null}

        <Button minWidth="88%" height={50} mt={20} loading={loading} disabled={Boolean(backendError)} onPress={handleSubmit}>
          {i18n.t('sign_up')}
        </Button>
      </Container>

      <RowContainer pt={20} justifyContent="center" alignItems="flex-end">
        <Text>{i18n.t('have_account')} </Text>
        <Button mode="text" textSize={14} onPress={handleSignInPress}>
          {i18n.t('sign_in')}
        </Button>
      </RowContainer>
    </MainContainer>
  );
};

export default SignInScreen;
