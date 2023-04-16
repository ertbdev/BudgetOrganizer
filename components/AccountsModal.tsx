import React from 'react';
import {Modal} from 'react-native';
import {Container, RowContainer} from '../styles/styledComponents/containers';
import {Card} from '../styles/styledComponents/card';
import Text from './common/Text';
import Button from './common/Button';
import {accounts} from '../assets/constants/expenses';

type Props = {
  showModal?: boolean;
  onClosePress?: () => void;
  onAccountPress?: (account: string) => void;
};

const AccountsModal = ({showModal, onClosePress, onAccountPress}: Props) => {
  return (
    <Modal visible={showModal} animationType="fade" transparent={true}>
      <Container height={'100%'}>
        <Card p={20} width={'90%'} minHeight={150} justifyContent="space-between">
          <Text variant="title">Select an Account</Text>
          <Container py={20}>
            {accounts &&
              accounts.map((account, index) => (
                <Button
                  onPress={() => onAccountPress && onAccountPress(account)}
                  key={`${account}-${index}`}
                  mode="text"
                  my={10}
                  textSize={16}>
                  {account}
                </Button>
              ))}
          </Container>

          <Button height={35} onPress={onClosePress}>
            Cancel
          </Button>
        </Card>
      </Container>
    </Modal>
  );
};

export default AccountsModal;
