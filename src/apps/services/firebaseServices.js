// import { setUserProfileData } from './firestoreService';
import { toast } from "react-toastify";
import {
    getAuth,
    signInWithEmailAndPassword,
    signOut,
    createUserWithEmailAndPassword,
    updateProfile,
    FacebookAuthProvider,
    GoogleAuthProvider,
    signInWithPopup,
    updatePassword,
} from "firebase/auth";
import { httpsCallable, getFunctions } from "firebase/functions";
import {
    getDatabase,
    ref as fbRef,
    push,
    query,
    orderByKey,
    limitToLast,
} from "firebase/database";
import {
    getStorage,
    ref,
    uploadBytesResumable,
    deleteObject,
} from "firebase/storage";
import { app } from "../config/firebase";
import { addUserToFirestore } from "./firestoreServices";

const auth = getAuth(app);
const db = getDatabase(app);
const functions = getFunctions()

export function firebaseObjectToArray(snapshot) {
    if (snapshot) {
        return Object.entries(snapshot).map((e) =>
            Object.assign({}, e[1], { id: e[0] })
        );
    }
}

export function signInWithEmail(creds) {
    return signInWithEmailAndPassword(auth, creds.email, creds.password);
}

export function signOutFirebase() {
    return signOut(auth);
}

export function updateUserClaims(email) {
    const setAdmin = httpsCallable(functions, "setUserAsAdmin");
    return setAdmin(email);
}

export function updateUserClaimsPremium(email) {
    const setAdmin = httpsCallable(functions, "setUserAsPremiumAccount");
    return setAdmin(email);
}

export function newUser(data) {
    const addUser = httpsCallable(functions, "createUser");
    return addUser(data).then((result) => {
        const user = {
            uid: result.data.uid,
            displayName: result.data.displayName,
            photoURL: result.data.photoURL,
            email: result.data.email,
            creationTime: result.data.metadata.creationTime,
        };
        console.log(user);
        return addUserToFirestore(user);
    });
}