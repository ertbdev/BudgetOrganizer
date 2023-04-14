import React, {useState} from 'react';

import MainContainer from '../../components/common/MainContainer';
import {Container, RowContainer} from '../../styles/styledComponents/containers';
import TextInput from '../../components/common/TextInput';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import {useTheme} from 'styled-components/native';
import Text from '../../components/common/Text';
import Button from '../../components/common/Button';
import i18n from '../../assets/locale/i18n';
import GoogleLogo from '../../assets/svg/GoogleLogo';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../types/navigation';
import {useFormik} from 'formik';
import {signInSchema} from '../../schemas/signInSchema';
import {useAuthContext} from '../../providers/AuthProvider';

type Props = NativeStackScreenProps<RootStackParamList, 'SignInScreen'>;

const SignInScreen = ({navigation}: Props) => {
  const {palette} = useTheme();
  const {signInUser} = useAuthContext();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [backendError, setBackendError] = useState<string>();

  const toggleShowPassword = () => {
    setShowPassword(value => !value);
  };

  const handleSignUpPress = () => {
    navigation.replace('SignUpScreen');
  };

  const handleForgotPasswordPress = () => {
    //todo
  };

  const handleSignIn = async () => {
    setLoading(true);
    if (values.password.length > 5) {
      try {
        await signInUser(values.email, values.password);
      } catch (err) {
        const error = (err as string).split('/')[1].replace(/-/g, '_');
        setBackendError(error);
      }
      setLoading(false);
    } else {
      setTimeout(() => {
        setBackendError('wrong_email_password');
        setLoading(false);
      }, 500);
    }

    //todo
  };

  const handleGoogleSignIn = () => {
    //todo
  };

  const handleChangeEmail = (value: string) => {
    backendError && setBackendError(undefined);
    setFieldValue('email', value);
  };

  const handleChangePassword = (value: string) => {
    backendError && setBackendError(undefined);
    setFieldValue('password', value);
  };

  const {setFieldValue, handleSubmit, handleBlur, values, errors, touched} = useFormik({
    validationSchema: signInSchema,
    initialValues: {email: '', password: ''},
    onSubmit: handleSignIn,
  });

  return (
    <MainContainer pb={20} justifyContent="space-around" variant="keyboard-avoidance">
      <Container height={150} justifyContent="center">
        <Icon name="lock" size={70} color={palette.primary.main} />
      </Container>

      <Container>
        <TextInput
          label={`${i18n.t('email_address')}:`}
          placeholder={i18n.t('enter_email_address')}
          value={values.email}
          onChangeText={handleChangeEmail}
          onBlur={handleBlur('email')}
          error={touched.email && errors.email ? i18n.t(`errors.${errors.email}`) : undefined}
          width={'90%'}
          keyboardType="email-address"
          left={<Icon name="at" size={25} color={palette.gray[500]} />}
        />

        <TextInput
          label={`${i18n.t('password')}:`}
          placeholder={i18n.t('enter_password')}
          value={values.password}
          onChangeText={handleChangePassword}
          onBlur={handleBlur('password')}
          error={touched.password && errors.password ? i18n.t(`errors.${errors.password}`) : undefined}
          secureTextEntry={!showPassword}
          width={'90%'}
          left={<Icon name="lock" size={25} color={palette.gray[500]} />}
          right={<Icon name={showPassword ? 'eye-off' : 'eye'} size={25} color={palette.gray[500]} />}
          onRightPress={toggleShowPassword}
        />

        {backendError ? <Text color={palette.error.main}>{i18n.t(`errors.${backendError}`)}</Text> : null}

        <Button mode="text" textSize={16} mt={5} onPress={handleForgotPasswordPress}>
          {i18n.t('forgot_password')}?
        </Button>

        <Button minWidth="88%" height={50} mt={20} loading={loading} disabled={Boolean(backendError)} onPress={handleSubmit}>
          {i18n.t('sign_in')}
        </Button>

        <>
          <Text mt={30} mb={20}>
            -- {i18n.t('or')} --
          </Text>
          <Text>{i18n.t('sign_in_with')}</Text>
          <Button mode="rounded" buttonColor="#FFF" height={50} mt={20} onPress={handleGoogleSignIn}>
            <GoogleLogo size={26} />
          </Button>
        </>
      </Container>

      <RowContainer pt={20} justifyContent="center">
        <Text>{i18n.t('do_not_have_account')} </Text>
        <Button mode="text" textSize={14} onPress={handleSignUpPress}>
          {i18n.t('sign_up')}
        </Button>
      </RowContainer>
    </MainContainer>
  );
};

export default SignInScreen;
