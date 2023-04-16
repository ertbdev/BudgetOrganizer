import React from 'react';
import {Modal, ScrollView} from 'react-native';
import {Container, RowContainer} from '../styles/styledComponents/containers';
import {Card} from '../styles/styledComponents/card';
import Text from './common/Text';
import Button from './common/Button';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {useTheme} from 'styled-components/native';
import {categories, categoryList} from '../assets/constants/expenses';

type Props = {
  showModal?: boolean;
  onClosePress?: () => void;
  onItemPress?: (account: string) => void;
};

const CategoriesModal = ({showModal = false, onClosePress, onItemPress}: Props) => {
  const {palette} = useTheme();

  return (
    <Modal visible={showModal} animationType="fade" transparent={true}>
      <Container variant="full">
        <Card p={20} width={'90%'} minHeight={150} maxHeight={'70%'} justifyContent="space-between">
          <Text variant="title">Select a Category</Text>
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{width: '100%'}}>
            <RowContainer py={20} style={{flexWrap: 'wrap'}}>
              {categoryList.map((item, index) => (
                <Button
                  onPress={() => onItemPress && onItemPress(item)}
                  key={`${item}-${index}`}
                  mode="contained"
                  buttonColor={palette.background.paper}
                  textColor={palette.gray[700]}
                  height={30}
                  m={5}
                  textSize={16}
                  capitalize>
                  <MaterialCommunityIcons name={categories[item].materialCommunityIcon} size={18} /> {item}
                </Button>
              ))}
            </RowContainer>
          </ScrollView>

          <Button height={35} onPress={onClosePress}>
            Cancel
          </Button>
        </Card>
      </Container>
    </Modal>
  );
};

export default CategoriesModal;
