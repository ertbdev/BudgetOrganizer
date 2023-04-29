# BudgetOrganizer

Mobile application for budget and expense management (Android). This project was developed using React Native, expo and Firebase.

## Packages Used

- [React Navigation v6](https://reactnavigation.org/)
- [React Native Firebase v6](https://rnfirebase.io/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [React Native DateTimePicker](https://www.npmjs.com/package/@react-native-community/datetimepicker)
- [Styled Components](https://styled-components.com/)
- [React Native Vector Icons](https://github.com/oblador/react-native-vector-icons)
- [i18n-js](https://www.npmjs.com/package/i18n-js)
- [yup](https://github.com/jquense/yup)
- [yup Password](https://www.npmjs.com/package/yup-password)
- [react native google sign in](https://github.com/react-native-google-signin/google-signin)
- [Day.js](https://day.js.org/)
- [React Native Email Link](https://www.npmjs.com/package/react-native-email-link)
- [Formik](https://formik.org/docs/overview)


### DESCRIPTION

#### Actions:

- Users can create an account using email/password
- Users can sign in using existing email/password
- Users can sign in using Google (OAuth)
- Users can add/edit/delete expenses
- Users can add/edit/delete incomes
- Users can track monthly expenses
- Users can track monthly incomes

#### Creation of an account (email/password): 

- The user fills the signup form and presses Sign in button
- The form is validated using a yup schema 
- If data meet the requirements, the sign in firebase function is called using the provided data 
- If the data is valid, the account is created and the user is signed in

#### Sign in the application by third parties (Google):

- User presses Google button to sign in
- The client requests a token from third parties (Google).
- Third parties redirect the user to a secure page in the service provider to sign in.
- The user authenticates on Google.
- The client uses the token to generate credentials.
- The client calls the signInWithCredential firebase function using the generated credentials
- If the credentials are valid, the account is created and the user is signed in

#### Add/edit income/expense:

- The user fills the income/expense form and presses Save button
- The form is validated using a yup schema 
- If data meet the requirements, the add/update firebase function is called using the provided data 
- If the data is valid, the income/expense is created/updated


### Authentication UI

![auth](https://firebasestorage.googleapis.com/v0/b/portfolio-4de53.appspot.com/o/readme%2FBO_auth_UI.png?alt=media&token=163040cf-8469-40d7-9b66-579e98bbe82a)

### Application UI

![UI](https://firebasestorage.googleapis.com/v0/b/portfolio-4de53.appspot.com/o/readme%2FBO_app_UI.png?alt=media&token=f59259b6-501f-457d-a5c1-3b53fd5ce62e)  

[Add expense gif](https://firebasestorage.googleapis.com/v0/b/portfolio-4de53.appspot.com/o/readme%2Fadd_expense.gif?alt=media&token=54a28ca5-9d10-4f36-a442-123d486acee1)

![](https://firebasestorage.googleapis.com/v0/b/portfolio-4de53.appspot.com/o/readme%2Fadd_expense.gif?alt=media&token=54a28ca5-9d10-4f36-a442-123d486acee1)

### INSTALATION

- Clone the git project 
- Install the required modules: - npm install
- Create the [firebase project ](https://console.firebase.google.com/?consoleUI=FIREBASE)
- Configure the Sign-in providers email/password and google 
- Add Android App and configure the SHA certificate fingerprints 
- Create firestore database
- Deploy firestore security rules
- Download the google-services.json file from the App configuration and place it inside of your project root
#### Notes: 

- For obtaining the SHA certificate fingerprints you can use the following commands: 

```
cd android && ./gradlew signingReport
```
or
```
keytool -list -v -keystore ./App/debug.keystore -alias androiddebugkey -storepass android -keypass android
```

- For aditional information please visit [React Native Firebase](https://rnfirebase.io/)

- For Deploying firestore security rules you can use the following commands:

```
cd firebase
firebase deploy --only firestore:rules
```

### Build PROJECT
```
npx expo run:android
```

### Run PROJECT
```
npx expo start --dev-client
```

### TO-DO

:black_square_button: Add Profile Screen  
:black_square_button: Add Configuration Screen  
:black_square_button: Add testing  
