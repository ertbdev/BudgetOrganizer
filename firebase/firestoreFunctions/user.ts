import firestore from '@react-native-firebase/firestore';
import {User} from '../../models/user';
import {addAcount} from './accounts';

export const addUser = async (userData: User) => {
  try {
    if (!userData.id) {
      throw 'User ID undefined';
    }
    const {id, ...user} = userData;
    await firestore().collection('Users').doc(userData.id).set(user);
    await addAcount('Bank_Account', 0);
    await addAcount('Cash', 0);
  } catch (err) {
    throw err;
  }
};

export const getUserData = async (id: string) => {
  try {
    const result = await firestore().collection('Users').doc(id).get();
    const user = {...result.data(), id: result.id};
    return user as Partial<User>;
  } catch (err) {
    throw err;
  }
};
