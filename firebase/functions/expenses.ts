import firestore, {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
import {Expense} from '../../models/expense';
import auth from '@react-native-firebase/auth';

export const addExpense = async (data: Expense) => {
  const uid = auth().currentUser?.uid;

  if (!uid) {
    throw 'User is not logged in ';
  }

  try {
    const result = await firestore()
      .collection('Users')
      .doc(uid)
      .collection('Expenses')
      .add({...data, ownerId: uid});
    return {...data, id: result.id, ownerId: uid} as Expense;
  } catch (err) {
    const firebaseError = err as {code: string};
    console.error(firebaseError);
    throw firebaseError.code;
  }
};

export const getExpenses = async () => {
  const uid = auth().currentUser?.uid;

  if (!uid) {
    throw 'User is not logged in ';
  }

  try {
    const snapshot = await firestore().collection('Users').doc(uid).collection('Expenses').orderBy('date', 'desc').get();
    const expenses: Expense[] = [];
    snapshot.forEach(item => expenses.push({...(item.data() as Expense), id: item.id}));
    return expenses;
  } catch (err) {
    const firebaseError = err as {code: string};
    console.error(firebaseError);
    throw firebaseError.code;
  }
};

export const expensesSubscriber = (
  uid: string,
  callback: (snapshot: FirebaseFirestoreTypes.QuerySnapshot<FirebaseFirestoreTypes.DocumentData>) => void,
) => {
  const subscriber = firestore()
    .collection('Users')
    .doc(uid)
    .collection('Expenses')
    .orderBy('date', 'desc')
    .onSnapshot(callback, err => console.error(err));

  return subscriber;
};
