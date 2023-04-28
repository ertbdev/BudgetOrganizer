import React from 'react';
import {createContext, useCallback, useContext, useEffect, useMemo, useState} from 'react';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {User} from '../models/user';
import {addUser} from '../firebase/functions/user';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

type AuthContext = {
  authenticated?: boolean;
  user?: User;
  signInUser: (email: string, password: string) => Promise<void>;
  signUpUser: (email: string, password: string) => Promise<void>;
  signOutUser: () => Promise<void>;
  sendPasswordResetEmail: (email: string) => Promise<void>;
  singInUserUsingGoogle: () => Promise<void>;
};

const context = createContext<AuthContext | null>(null);

export const AuthProvider = ({children}: {children: JSX.Element}) => {
  const [user, setUser] = useState<User>();
  const [authenticated, setAuthenticated] = useState<boolean>();

  const signInUser = useCallback(async (email: string, password: string) => {
    try {
      await auth().signInWithEmailAndPassword(email, password);
    } catch (err) {
      const firebaseError = err as {code: string};
      console.error(firebaseError);
      throw firebaseError.code;
    }
  }, []);

  const singInUserUsingGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      const {idToken} = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(googleCredential);
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const signUpUser = useCallback(async (email: string, password: string, name?: string) => {
    try {
      const result = await auth().createUserWithEmailAndPassword(email, password);
      const uid = result.user.uid;
      const _name = name || email.split('@')[0];
      const creationTime = result.user.metadata.creationTime ? new Date(result.user.metadata.creationTime).getTime() : new Date().getTime();
      await addUser({id: uid, name: _name, email: email, creationTime: creationTime});
    } catch (err) {
      const firebaseError = err as {code: string};
      console.error(firebaseError);
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
    } catch (err) {
      const firebaseError = err as {code: string};
      console.error(firebaseError);
      throw firebaseError.code;
    }
  };

  const sendPasswordResetEmail = useCallback(async (email: string) => {
    try {
      await auth().sendPasswordResetEmail(email);
    } catch (err) {
      const firebaseError = err as {code: string};
      console.error(firebaseError);
      throw firebaseError.code;
    }
  }, []);

  const getLoggedUser = useCallback(async (loggedUser: FirebaseAuthTypes.User | null) => {
    setAuthenticated(loggedUser !== null);
    loggedUser && setUser({id: loggedUser.uid, email: loggedUser.email || '', name: '', creationTime: 0});
  }, []);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(getLoggedUser);

    GoogleSignin.configure({
      webClientId: '26665976803-9o82f9if6hpog72id8mcdrrf3lvondlk.apps.googleusercontent.com',
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
