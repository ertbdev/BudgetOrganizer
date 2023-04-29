import firestore, {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {Income} from '../../models/income';

export const addIncome = async (data: Income) => {
  const uid = auth().currentUser?.uid;

  if (!uid) {
    throw 'User is not logged in ';
  }

  try {
    const result = await firestore()
      .collection('Users')
      .doc(uid)
      .collection('Incomes')
      .add({...data, ownerId: uid});
    return {...data, id: result.id, ownerId: uid} as Income;
  } catch (err) {
    const firebaseError = err as {code: string};
    console.error('incomes/addIncome:', firebaseError);
    throw firebaseError.code;
  }
};

export const updateIncome = async (data: Partial<Income>) => {
  const uid = auth().currentUser?.uid;

  if (!uid) {
    throw 'User is not logged in ';
  }

  try {
    await firestore().collection('Users').doc(uid).collection('Incomes').doc(data.id).update(data);
  } catch (err) {
    const firebaseError = err as {code: string};
    console.error('incomes/updateIncome:', firebaseError);
    throw firebaseError.code;
  }
};

export const deleteIncome = async (id: string) => {
  const uid = auth().currentUser?.uid;

  if (!uid) {
    throw 'User is not logged in ';
  }

  try {
    await firestore().collection('Users').doc(uid).collection('Incomes').doc(id).delete();
  } catch (err) {
    const firebaseError = err as {code: string};
    console.error('incomes/deleteIncome:', firebaseError);
    throw firebaseError.code;
  }
};

export const getIncomes = async () => {
  const uid = auth().currentUser?.uid;

  if (!uid) {
    throw 'User is not logged in ';
  }

  try {
    const snapshot = await firestore().collection('Users').doc(uid).collection('Incomes').orderBy('date', 'desc').get();
    const incomes: Income[] = [];
    snapshot.forEach(item => incomes.push({...(item.data() as Income), id: item.id}));
    return incomes;
  } catch (err) {
    const firebaseError = err as {code: string};
    console.error('incomes/getIncomes:', firebaseError);
    throw firebaseError.code;
  }
};

export const incomesSubscriber = (
  uid: string,
  callback: (snapshot: FirebaseFirestoreTypes.QuerySnapshot<FirebaseFirestoreTypes.DocumentData>) => void,
) => {
  const subscriber = firestore()
    .collection('Users')
    .doc(uid)
    .collection('Incomes')
    .orderBy('date', 'desc')
    .onSnapshot(callback, err => console.error('incomes/incomesListener:', err));

  return subscriber;
};
