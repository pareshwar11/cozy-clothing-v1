import {initializeApp} from 'firebase/app';

import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
  } from 'firebase/auth';

  import { getFirestore, doc, getDoc, setDoc, collection, writeBatch, query,getDocs} from 'firebase/firestore';

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




// start collection for fireStore DB

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const batch = writeBatch(db);
  const collectionRef = collection(db, collectionKey);
  
  objectsToAdd.forEach((object) => {
     const docRef = doc(collectionRef, object.title.toLowerCase());
     batch.set(docRef, object);
  });

  await batch.commit();
  console.log('done');
};
 // End of Colletion store

 // Now get categories from FireStore

 export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, 'categories');
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    const { title, items } = docSnapshot.data();
    acc[title.toLowerCase()] = items;
    return acc;
  }, {});

  return categoryMap;
};

 // End of Get categories from FireStore

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

// end Email/Password

// Start signOut functionality

export const signOutUser = () => signOut(auth);

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);