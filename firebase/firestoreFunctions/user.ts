import firestore from '@react-native-firebase/firestore';
import {User} from '../../models/user';

export const addUser = async (userData: User) => {
  try {
    await firestore().collection('Users').doc(userData.id).set(userData);
  } catch (err) {
    throw err;
  }
};
