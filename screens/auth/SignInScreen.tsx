import React, {useEffect, useState} from 'react';
import {Keyboard, Platform, KeyboardEvent} from 'react-native';

import MainContainer from '../../components/common/MainContainer';
import {Container, RowContainer} from '../../styles/styledComponents/containers';
import TextInput from '../../components/common/TextInput';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import {useTheme} from 'styled-components/native';
import Text from '../../components/common/Text';
import Button from '../../components/common/Button';
import i18n from '../../assets/locale/i18n';
import GoogleLogo from '../../assets/svg/GoogleLogo';

const SignInScreen = () => {
  const {palette} = useTheme();

  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(value => !value);
  };

  const handleSignUpPress = () => {
    // Todo
  };

  const handleForgotPasswordPress = () => {
    //todo
  };

  const handleSubmit = () => {
    //todo
  };

  const handleGoogleSignIn = () => {
    //todo
  };

  return (
    <MainContainer justifyContent="space-around" variant="keyboard-avoidance">
      <Container height={150} justifyContent="center">
        <Icon name="lock" size={70} color={palette.primary.main} />
      </Container>

      <Container>
        <TextInput
          label={`${i18n.t('email-address')}:`}
          placeholder={i18n.t('enter-email-address')}
          width={'90%'}
          keyboardType="email-address"
          left={<Icon name="at" size={25} color={palette.gray[500]} />}
        />
        <TextInput
          label={`${i18n.t('password')}:`}
          placeholder={i18n.t('enter-password')}
          secureTextEntry={!showPassword}
          width={'90%'}
          left={<Icon name="lock" size={25} color={palette.gray[500]} />}
          right={<Icon name={showPassword ? 'eye-off' : 'eye'} size={25} color={palette.gray[500]} />}
          onRightPress={toggleShowPassword}
        />

        <Button mode="text" textSize={16} mt={5} onPress={handleForgotPasswordPress}>
          {i18n.t('forgot-password')}?
        </Button>

        <Button minWidth="88%" height={50} mt={20} loading={false} onPress={handleSubmit}>
          {i18n.t('sign-in')}
        </Button>

        <>
          <Text mt={30} mb={20}>
            -- {i18n.t('or')} --
          </Text>
          <Text>{i18n.t('sign-in-with')}</Text>
          <Button mode="rounded" buttonColor="#FFF" height={50} mt={20} onPress={handleGoogleSignIn}>
            <GoogleLogo size={26} />
          </Button>
        </>
      </Container>

      <RowContainer justifyContent="center">
        <Text>{i18n.t('do-not-have-account')} </Text>
        <Button mode="text" textSize={14} onPress={handleSignUpPress}>
          {i18n.t('sign-up')}
        </Button>
      </RowContainer>
    </MainContainer>
  );
};

export default SignInScreen;
