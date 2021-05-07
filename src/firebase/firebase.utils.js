import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';



const firebaseConfig = {
    apiKey: "AIzaSyBSZ5FAG7gMFVli4ulpe2lQljmDAyzroCs",
    authDomain: "project-aurora-e24f6.firebaseapp.com",
    projectId: "project-aurora-e24f6",
    storageBucket: "project-aurora-e24f6.appspot.com",
    messagingSenderId: "663150708364",
    appId: "1:663150708364:web:530dce5020aa81c4419da9"
};


firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();


const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});

export const signInWithGoogle = () => auth.signInWithPopup(provider);
export const signOut = () => auth.signOut();
export const storage = firebase.storage()

export {firebase, storage as default};