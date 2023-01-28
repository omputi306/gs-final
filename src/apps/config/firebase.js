import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAER5FiPJ2wJPLeE7dh_8wOAjRKlLhXlnY",
  authDomain: "gunung-selatan.firebaseapp.com",
  projectId: "gunung-selatan",
  storageBucket: "gunung-selatan.appspot.com",
  messagingSenderId: "683052955993",
  appId: "1:683052955993:web:1d01db530faa1468c2b448",
  measurementId: "G-0PC27MQTZB",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
