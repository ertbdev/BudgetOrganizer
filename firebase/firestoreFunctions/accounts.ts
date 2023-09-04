import firestore, {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {Account} from '../../models/account';

export const addAcount = async (name: string, availableFunds = 0) => {
  const uid = auth().currentUser?.uid;

  if (!uid) {
    throw 'User is not logged in ';
  }
  await firestore()
    .collection('Users')
    .doc(uid)
    .collection('Accounts')
    .doc(name)
    .set({availableFunds: availableFunds, creationTime: new Date().getTime()});
};

export const updateFunds = async (account: string, value: number) => {
  const uid = auth().currentUser?.uid;

  if (!uid) {
    throw 'User is not logged in ';
  }
  try {
    await firestore()
      .collection('Users')
      .doc(uid)
      .collection('Accounts')
      .doc(account)
      .update({availableFunds: firestore.FieldValue.increment(value)});
  } catch (err) {
    throw err;
  }
};

export const getAccounts = async () => {
  const uid = auth().currentUser?.uid;

  if (!uid) {
    throw 'User is not logged in ';
  }

  try {
    const result = await firestore().collection('Users').doc(uid).collection('Accounts').get();
    const accounts: Account[] = [];
    result.forEach(item => {
      accounts.push({name: item.id, availableFunds: item.data().availableFunds, creationTime: item.data().creationTime});
    });
    return accounts;
  } catch (err) {
    const firebaseError = err as {code: string};
    console.error('accounts/getAccounts:', firebaseError);
    throw firebaseError.code;
  }
};

export const accountsSubscriber = (
  uid: string,
  callback: (snapshot: FirebaseFirestoreTypes.QuerySnapshot<FirebaseFirestoreTypes.DocumentData>) => void,
) => {
  const subscriber = firestore()
    .collection('Users')
    .doc(uid)
    .collection('Accounts')
    .onSnapshot(callback, err => console.error('accounts/accountsListerner:', err));
  return subscriber;
};
