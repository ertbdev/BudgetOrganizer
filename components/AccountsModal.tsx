import React from 'react';
import {Modal} from 'react-native';
import {Container, RowContainer} from '../styles/styledComponents/containers';
import {Card} from '../styles/styledComponents/card';
import Text from './common/Text';
import Button from './common/Button';
import {useAppSelector} from '../hooks/redux';

type Props = {
  showModal?: boolean;
  onClosePress?: () => void;
  onAccountPress?: (account: string) => void;
};

const AccountsModal = ({showModal, onClosePress, onAccountPress}: Props) => {
  const accounts = useAppSelector(state => state.accountsSlice.accounts);
  return (
    <Modal visible={showModal} animationType="fade" transparent={true}>
      <Container variant="full">
        <Card p={20} width={'90%'} minHeight={150} justifyContent="space-between">
          <Text variant="title">Select an Account</Text>
          <Container py={20}>
            {accounts &&
              accounts.map((account, index) => (
                <Button
                  onPress={() => onAccountPress && onAccountPress(account.name)}
                  key={`${account.name}-${index}`}
                  mode="text"
                  my={10}
                  textSize={16}>
                  {account.name.replace('_', ' ')}
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
