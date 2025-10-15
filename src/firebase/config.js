import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyCJH8YiE670HqPJ1w7gp...E_MVyoatAFaHs", 
  authDomain: "challenge-11-6a879.firebaseapp.com",
  projectId: "challenge-11-6a879",
  storageBucket: "challenge-11-6a879.appspot.com",
  messagingSenderId: "786129279377",
  appId: "1:786129279377:web:45d1bba0a16852feffe230"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

