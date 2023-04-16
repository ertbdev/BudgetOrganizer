import React from 'react';
import {Card} from '../styles/styledComponents/card';
import Text from './common/Text';
import {Container} from '../styles/styledComponents/containers';
import TextInput from './common/TextInput';

const AddExpenseCard = () => {
  return (
    <Card width={'90%'} p={20}>
      <Text variant="title">Add Expense</Text>
      <Container height={50}>
        <Text>add image</Text>
      </Container>
      <TextInput label="account" />
      <TextInput label="value" />
    </Card>
  );
};

export default AddExpenseCard;
