// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCIUnPKzzLfKvV2Kv5o9SHPPtpSisTiOV4",
  authDomain: "log-2834.firebaseapp.com",
  databaseURL: "https://log-2834-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "log-2834",
  storageBucket: "log-2834.appspot.com",
  messagingSenderId: "28107955421",
  appId: "1:28107955421:web:ebfa83b0b31e5be57c4f34",
  measurementId: "G-YBYXSEWGT0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app