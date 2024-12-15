import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCWFDSXAxyezi2ktimyTD7FSQI4hAXfJik",
  authDomain: "shop-sphere-react.firebaseapp.com",
  projectId: "shop-sphere-react",
  storageBucket: "shop-sphere-react.firebasestorage.app",
  messagingSenderId: "541191915933",
  appId: "1:541191915933:web:4d40287d8f21fe387b8774",
  measurementId: "G-ZPR0H14SS0"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth(app);  // Now you can use `auth` for authentication

export { auth }; 