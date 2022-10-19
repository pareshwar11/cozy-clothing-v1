import {initializeApp} from 'firebase/app';

import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  } from 'firebase/auth';

  import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDsa7_D8P8poutKrRyI4hkDfeDl8Ls-FAs",
    authDomain: "cozy-clothing-v1-db.firebaseapp.com",
    projectId: "cozy-clothing-v1-db",
    storageBucket: "cozy-clothing-v1-db.appspot.com",
    messagingSenderId: "974835529208",
    appId: "1:974835529208:web:28614e6a0bbfd91f8e520d"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: 'select_account',
});

// Start Google authentication
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if(!userAuth) return;

  const userDocRef = doc(db, 'users', userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log('error creating the user', error.message);
    }
  }

  return userDocRef;
};

// End Google Authentication

// Start Email/Password Authentication
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};