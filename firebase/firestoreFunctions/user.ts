import firestore from '@react-native-firebase/firestore';
import {User} from '../../models/user';

export const addUser = async (userData: User) => {
  try {
    await firestore().collection('Users').doc(userData.id).set(userData);
  } catch (err) {
    throw err;
  }
};

export const getUserData = async (id:string) => {
  try {
    const user = (await firestore().collection('Users').doc(id).get()).data();
    return user as Partial<User>
  } catch (err) {
    throw err;
  }
};
