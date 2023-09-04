import firestore, {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
import {Expense} from '../../models/expense';
import auth from '@react-native-firebase/auth';
import dayjs from 'dayjs';

export const addExpense = async (data: Expense) => {
  const uid = auth().currentUser?.uid;

  if (!uid) {
    throw 'User is not logged in ';
  }

  try {
    const month = dayjs(data.date).format('MM-YYYY');
    const result = await firestore()
      .collection('Users')
      .doc(uid)
      .collection('Transactions')
      .doc(month)
      .collection('Expenses')
      .add({...data});
    return {...data, id: result.id, ownerId: uid} as Expense;
  } catch (err) {
    const firebaseError = err as {code: string};
    console.error('expenses/addExpense:', firebaseError);
    throw firebaseError.code;
  }
};

export const updateExpense = async (data: Partial<Expense>) => {
  const uid = auth().currentUser?.uid;

  if (!uid) {
    throw 'User is not logged in ';
  }

  try {
    await firestore().collection('Users').doc(uid).collection('Expenses').doc(data.id).update(data);
  } catch (err) {
    const firebaseError = err as {code: string};
    console.error('expenses/UpdateExpense:', firebaseError);
    throw firebaseError.code;
  }
};

export const deleteExpense = async (id: string) => {
  const uid = auth().currentUser?.uid;

  if (!uid) {
    throw 'User is not logged in ';
  }

  try {
    await firestore().collection('Users').doc(uid).collection('Expenses').doc(id).delete();
  } catch (err) {
    const firebaseError = err as {code: string};
    console.error('expenses/deleteExpense:', firebaseError);
    throw firebaseError.code;
  }
};

export const getExpenses = async (month: string) => {
  const uid = auth().currentUser?.uid;

  if (!uid) {
    throw 'User is not logged in ';
  }

  try {
    const snapshot = await firestore()
      .collection('Users')
      .doc(uid)
      .collection('Transactions')
      .doc(month)
      .collection('Expenses')
      .orderBy('date', 'desc')
      .get();
    const expenses: Expense[] = [];
    snapshot.forEach(item => expenses.push({...(item.data() as Expense), id: item.id}));
    return expenses;
  } catch (err) {
    const firebaseError = err as {code: string};
    console.error('expenses/getExpense:', firebaseError);
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
    .onSnapshot(callback, err => console.error('expenses/ExpensesListerner:', err));

  return subscriber;
};
