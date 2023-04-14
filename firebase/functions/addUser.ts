import firestore from '@react-native-firebase/firestore';
import {User} from '../../models/user';

export default async function addUser(userData: User) {
  try {
    await firestore().collection('Users').add(userData);
  } catch (err) {
    throw err;
  }
}
