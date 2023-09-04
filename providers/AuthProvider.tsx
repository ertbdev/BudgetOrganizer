import React from 'react';
import {createContext, useCallback, useContext, useEffect, useMemo, useState} from 'react';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {User} from '../models/user';
import {addUser, getUserData} from '../firebase/firestoreFunctions/user';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {useAppDispatch} from '../hooks/redux';
import {setUserData} from '../redux/userSlice';
import {getAccounts} from '../firebase/firestoreFunctions/accounts';
import {setAccounts} from '../redux/accountsSlice';

type AuthContext = {
  authenticated?: boolean;
  user?: User;
  signInUser: (email: string, password: string) => Promise<void>;
  signUpUser: (email: string, password: string) => Promise<void>;
  signOutUser: () => Promise<void>;
  sendPasswordResetEmail: (email: string) => Promise<void>;
  singInUserUsingGoogle: () => Promise<void>;
};

const initialConfig = {
  montlyBudget: 2000,
};

const context = createContext<AuthContext | null>(null);

export const AuthProvider = ({children}: {children: JSX.Element}) => {
  const [user, setUser] = useState<User>();
  const [authenticated, setAuthenticated] = useState<boolean>();

  const dispatch = useAppDispatch();

  const signInUser = useCallback(async (email: string, password: string) => {
    try {
      await auth().signInWithEmailAndPassword(email, password);
    } catch (err) {
      const firebaseError = err as {code: string};
      console.error('AuthProvider/signInUser:', firebaseError);
      throw firebaseError.code;
    }
  }, []);

  const singInUserUsingGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      const {idToken} = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      const result = await auth().signInWithCredential(googleCredential);
      const user = await getUserData(result.user.uid);

      const googleUser = await GoogleSignin.getCurrentUser();
      if (!user?.creationTime) {
        const uid = result.user.uid;
        const creationTime = result.user.metadata.creationTime
          ? new Date(result.user.metadata.creationTime).getTime()
          : new Date().getTime();
        const newUser = {
          id: uid,
          name: googleUser?.user.name || '',
          email: googleUser?.user.email || '',
          creationTime: creationTime,
          config: initialConfig,
        };
        await addUser(newUser);
        dispatch(setUserData(newUser));
      } else {
        dispatch(setUserData(user));
      }
    } catch (err) {
      console.error('AuthProvider/signInUserUsingGoogle:', err);
      throw err;
    }
  };

  const signUpUser = useCallback(async (email: string, password: string, name?: string) => {
    try {
      const result = await auth().createUserWithEmailAndPassword(email, password);
      const uid = result.user.uid;
      const _name = name || email.split('@')[0];
      const creationTime = result.user.metadata.creationTime ? new Date(result.user.metadata.creationTime).getTime() : new Date().getTime();
      const newUser = {id: uid, name: _name, email: email, creationTime: creationTime, config: initialConfig};
      await addUser(newUser);
      dispatch(setUserData(newUser));
    } catch (err) {
      const firebaseError = err as {code: string};
      console.error('AuthProvider/signUpUser:', firebaseError);
      throw firebaseError.code;
    }
  }, []);

  const signOutUser = async () => {
    try {
      const isSignedInWithGoogle = await GoogleSignin.isSignedIn();
      isSignedInWithGoogle && (await GoogleSignin.signOut());
      await auth().signOut();
      setUser(undefined);
      setAuthenticated(false);
      dispatch(setUserData({}));
    } catch (err) {
      const firebaseError = err as {code: string};
      console.error('AuthProvider/signOutUser:', firebaseError);
      throw firebaseError.code;
    }
  };

  const sendPasswordResetEmail = useCallback(async (email: string) => {
    try {
      await auth().sendPasswordResetEmail(email);
    } catch (err) {
      const firebaseError = err as {code: string};
      console.error('AuthProvider/sendPasswordResetEmail:', firebaseError);
      throw firebaseError.code;
    }
  }, []);

  const getLoggedUser = useCallback(async (loggedUser: FirebaseAuthTypes.User | null) => {
    setAuthenticated(loggedUser !== null);
    loggedUser && setUser({id: loggedUser.uid, email: loggedUser.email || '', name: '', creationTime: 0, config: initialConfig});
  }, []);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(getLoggedUser);

    GoogleSignin.configure({
      webClientId: '611562009813-bmkkrqfnfaf4jb5vusu96q5u7aevpfqu.apps.googleusercontent.com',
    });

    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const contextValue = useMemo<AuthContext>(
    () => ({
      user,
      authenticated,
      signInUser,
      signUpUser,
      signOutUser,
      sendPasswordResetEmail,
      singInUserUsingGoogle,
    }),
    [user, authenticated],
  );

  return <context.Provider value={contextValue}>{children}</context.Provider>;
};

export const useAuthContext = () => {
  const authContext = useContext(context);
  if (!authContext) {
    throw new Error('authContext error');
  }
  return authContext;
};
