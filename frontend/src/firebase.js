import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBMl8fQ5uVgfbzRkCuwv-hhJCeIIiF9Qsc",
  authDomain: "loginmdx.firebaseapp.com",
  projectId: "loginmdx",
  storageBucket: "loginmdx.firebasestorage.app",
  messagingSenderId: "106545197147",
  appId: "1:106545197147:web:97f5ba69ef508e2dc74f7e",
  measurementId: "G-PTVJ3TB3VR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

//Provedor Google
const googleProvider = new GoogleAuthProvider();

//Função login popup
async function signInWithGooglePopup() {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    throw error;
}
}

//função para logout
async function logout() {
    await signOut(auth);
}

export { auth, googleProvider, signInWithGooglePopup, logout };

