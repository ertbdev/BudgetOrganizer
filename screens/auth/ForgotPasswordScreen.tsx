import React, {useRef, useState} from 'react';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useTheme} from 'styled-components/native';
import TextInput, {TextInputRef} from '../../components/common/TextInput';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import Button from '../../components/common/Button';
import i18n from '../../assets/locale/i18n';
import {useAuthContext} from '../../providers/AuthProvider';
import {forgotPasswordSchema} from '../../schemas/forgotPasswordSchema';
import {openInbox} from 'react-native-email-link';
import MainContainer from '../../components/common/MainContainer';
import {Container} from '../../styles/styledComponents/containers';
import {RootStackParamList} from '../../types/navigation';
import Text from '../../components/common/Text';
import ScreenHeader from '../../components/ScreenHeader';

type Props = NativeStackScreenProps<RootStackParamList, 'ForgotPasswordScreen'>;

type FormFields = {
  email: string;
};

const ForgotPasswordScreen = ({navigation}: Props) => {
  const {palette} = useTheme();

  const sendPasswordResetEmail = useAuthContext().sendPasswordResetEmail;

  const emailRef: TextInputRef = useRef(null);

  const form = useRef<FormFields>({email: ''});
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleGoBackPress = () => {
    navigation.pop();
  };

  const handleOpenEmailAppPress = () => {
    openInbox();
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await forgotPasswordSchema.validate({...form.current}, {abortEarly: false});
      await sendPasswordResetEmail(form.current.email);
      setSent(true);
    } catch (err) {
      if (typeof err === 'string') {
        if (err === 'user-not-found') {
          setErrors(['no-user-record']);
        } else {
          setErrors([err as string]);
        }
      } else {
        // setErrors(getAuthYupErrors((err as {inner: {message: string; path: keyof FormFields}[]}).inner).email);
      }
    }
    setLoading(false);
  };

  const handleTryAnotherEmailPress = () => {
    setSent(false);
  };

  if (sent) {
    return (
      <MainContainer pb={20} justifyContent="flex-start" variant="keyboard-avoidance">
        <ScreenHeader title="Reset Password" onBackPress={handleGoBackPress} />

        <Container variant="full" justifyContent="space-around">
          <Container />
          <Container>
            <Icon name="email-fast" size={70} color={palette.primary.main} />
            <Text variant="subtitle2" my={20} mx={40} style={{textAlign: 'center'}}>
              {i18n.t('sent_email_message')}
            </Text>

            <Button minWidth="88%" height={50} borderRadius={15} mt={20} loading={loading} onPress={handleOpenEmailAppPress}>
              {i18n.t('open_email_app')}
            </Button>
          </Container>

          <Container>
            <Text>{i18n.t('did_not_receive_email_message')} </Text>
            <Button mode="text" textSize={14} onPress={handleTryAnotherEmailPress}>
              {i18n.t('try_another_email')}
            </Button>
          </Container>
        </Container>
      </MainContainer>
    );
  }

  return (
    <MainContainer pb={20} justifyContent="flex-start" variant="keyboard-avoidance">
      <ScreenHeader title="Reset Password" onBackPress={handleGoBackPress} />
      <Container variant="full" justifyContent="center" pb={50}>
        <Icon name="lock-reset" size={70} color={palette.primary.main} />
        <Text variant="subtitle2" mx={40} my={20} style={{textAlign: 'center'}}>
          {i18n.t('reset_email_message')}
        </Text>
        <TextInput
          ref={emailRef}
          label={`${i18n.t('email_address')}:`}
          width={'90%'}
          keyboardType="email-address"
          left={<Icon name="at" size={25} color={palette.gray[500]} />}
          onChangeText={text => {
            form.current.email = text;
            emailRef.current?.setNativeProps({text});
            errors.length > 0 && setErrors([]);
          }}
          error={errors[0] ? i18n.t(`errors.${errors[0]}`) : ''}
        />

        <Button minWidth="88%" height={50} borderRadius={15} mt={20} loading={loading} onPress={handleSubmit}>
          {i18n.t('send_instructions')}
        </Button>
      </Container>
    </MainContainer>
  );
};

// const makeStyles = (colors: Colors) =>
//   StyleSheet.create({
//     safeArea: {
//       flex: 1,
//     },
//     container: {
//       flex: 1,
//       justifyContent: 'space-between',
//       backgroundColor: colors.background.screen,
//     },
//     text: {
//       fontSize: 15,
//       fontWeight: '600',
//       color: colors.text.main,
//       marginBottom: 10,
//       marginHorizontal: '6%',
//       textAlign: 'center',
//     },
//     icon: {
//       marginBottom: 20,
//     },
//     topContainer: {
//       flexDirection: 'row',
//       width: '100%',
//       paddingTop: 10,
//       paddingLeft: 10,
//     },
//     middleContainer: {
//       width: '100%',
//       alignItems: 'center',
//     },
//     bottomContainer: {
//       width: '100%',
//       justifyContent: 'center',
//       paddingBottom: 20,
//     },
//     bottomText: {
//       fontSize: 14,
//       color: colors.primary.main,
//       textAlign: 'center',
//     },
//   });

export default ForgotPasswordScreen;
