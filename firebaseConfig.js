// Import the necessary functions from the Firebase SDKs
import { initializeApp, getApps, getApp } from 'firebase/app'; // Firebase app functions
import { getAuth } from 'firebase/auth'; // Firebase auth function

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCsG2BKDxNYGVoavJhbVPb2Gkjf1eVOwXA",
  authDomain: "todolistauth-59c13.firebaseapp.com",
  projectId: "todolistauth-59c13",
  storageBucket: "todolistauth-59c13.appspot.com",
  messagingSenderId: "1022552908046",
  appId: "1:1022552908046:web:8e6e1f1117cd3abc1bf75f"
};

// Initialize Firebase App
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig); // Initialize the app if not already initialized
} else {
  app = getApp(); // Use the existing app if it's already initialized
}

// Initialize Firebase Authentication
const auth = getAuth(app); // Get the authentication instance from the initialized app

export { auth };
