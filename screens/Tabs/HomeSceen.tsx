import React from 'react';

import {Text} from 'react-native';
import MainContainer from '../../components/common/MainContainer';
import Button from '../../components/common/Button';
import {useAuthContext} from '../../providers/AuthProvider';

const HomeScreen = () => {
  const {signOutUser, user} = useAuthContext();

  return (
    <MainContainer>
      <Text>{user?.email}</Text>
      <Button onPress={signOutUser}>Log out</Button>
    </MainContainer>
  );
};

export default HomeScreen;
