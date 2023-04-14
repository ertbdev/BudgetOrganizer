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

type Props = NativeStackScreenProps<RootStackParamList, 'SignUpScreen'>;

const SignInScreen = ({navigation}: Props) => {
  const {palette} = useTheme();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(value => !value);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(value => !value);
  };

  const handleSignInPress = () => {
    navigation.replace('SignInScreen');
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
    <MainContainer pb={20} justifyContent="space-around" variant="keyboard-avoidance">
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

        <TextInput
          label={`${i18n.t('confirm-password')}:`}
          placeholder={i18n.t('enter-password')}
          secureTextEntry={!showConfirmPassword}
          width={'90%'}
          left={<Icon name="lock" size={25} color={palette.gray[500]} />}
          right={<Icon name={showConfirmPassword ? 'eye-off' : 'eye'} size={25} color={palette.gray[500]} />}
          onRightPress={toggleShowConfirmPassword}
        />

        <Button minWidth="88%" height={50} mt={20} loading={false} onPress={handleSubmit}>
          {i18n.t('sign-up')}
        </Button>
      </Container>

      <RowContainer pt={20} justifyContent="center" alignItems="flex-end">
        <Text>{i18n.t('have-account')} </Text>
        <Button mode="text" textSize={14} onPress={handleSignInPress}>
          {i18n.t('sign-in')}
        </Button>
      </RowContainer>
    </MainContainer>
  );
};

export default SignInScreen;
