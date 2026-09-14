import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import { getFirestore } from "firebase/firestore";



const firebaseConfig = {
    apiKey: "AIzaSyAbngLnPkKqSHQrat7UcU-l-sePMHlR9hE",
    authDomain: "blog-application-71cd8.firebaseapp.com",
    projectId: "blog-application-71cd8",
    storageBucket: "blog-application-71cd8.firebasestorage.app",
    messagingSenderId: "420187820519",
    appId: "1:420187820519:web:60c774211755892504ad42"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const db = getFirestore(app);
