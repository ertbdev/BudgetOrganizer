import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp();
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info('Hello logs!', {structuredData: true});
//   response.send('Hello from Firebase!');
// });

// exports.onAddEntry = functions.firestore.document('/Users/{collection}/{id}').onCreate((snap, context) => {
// check auth state
//   if (!context.auth) {
//     throw new functions.https.HttpsError('unauthenticated', 'Only authenticated users can add data');
//   }
//   const user = admin.firestore().collection('Users').doc(context.auth.uid).collection('Accounts');
//   const data = snap.data();
//   console.log(data);
//   const collection = context.params.collection;
//   if (collection === 'Expenses') {
//     return user.get().then(doc=>{
//         return user.update({
//             config:{...doc.data()?.config, accounts:}
//         })
//     })
//   }
// });

export const onAddAccount = functions.firestore.document('Users/{userId}/Accounts/{id}').onCreate((snap, context) => {
  // check auth state
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'Only authenticated users can add data');
  }

  const id = context.params.id;
  const account = admin.firestore().collection('Users').doc(context.auth.uid).collection('Accounts').doc(id);
  console.log(snap.data());

  return account.update({...snap.data(), id});
});
