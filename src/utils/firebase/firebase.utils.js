import { GoogleAuthProvider, getAuth, signInWithPopup, signInWithRedirect } from 'firebase/auth';
import { doc, getDoc, getFirestore, setDoc } from 'firebase/firestore';

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAm0Ds1kLtYDdncS0QFn0bwq1-ZmeNh2d4',
  authDomain: 'crwn-clothing-db-46f8b.firebaseapp.com',
  projectId: 'crwn-clothing-db-46f8b',
  storageBucket: 'crwn-clothing-db-46f8b.appspot.com',
  messagingSenderId: '929087781045',
  appId: '1:929087781045:web:e0cecf387765ee698026fc',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Initialize provider for Google sign in
const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: 'select_account',
});

// Auth for whole app
export const auth = getAuth();
/*  anonymous function that returns the signInWithPopup
with our auth and specific provider with params */
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

// Firestore initialization
export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  // doc takes three args database, collection, identifier
  const userDocRef = doc(db, 'users', userAuth.uid);

  console.log(userDocRef);
  // creating a snapshot of the user reference
  const userSnapshot = await getDoc(userDocRef);
  // checking if the user reference id exists
  console.log(userSnapshot.exists());

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log('error creating the user', error.message);
    }
  }

  return userDocRef;

  //  if user data doesn't exist
  // create/set the document with the data from userAuth in my collection

  // if user data exists
  // return userDocRef
};
