import {initializeApp} from "firebase/app";
import {getDatabase, ref} from "firebase/database";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyDlBFrUTOF7J6NvJlqeABSdtYKOr4qgiXs",
    authDomain: "gta-baller.firebaseapp.com",
    databaseURL: "https://gta-baller-default-rtdb.firebaseio.com",
    projectId: "gta-baller",
    storageBucket: "gta-baller.appspot.com",
    messagingSenderId: "184696766878",
    appId: "1:184696766878:web:af690da82b49bf3a2c968f",
    measurementId: "G-QZ685H3BSB"
};
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const database = getDatabase(app);
export const dbRef = ref(getDatabase());
