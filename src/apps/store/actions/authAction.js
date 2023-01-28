import { SIGN_IN_USER, SIGN_OUT_USER } from "../constants/authConstant";
import { APP_LOADED } from "../reducers/asyncReducer";
import {
  // getFirestore,
  // collection,
  // Timestamp,
  doc,
  getFirestore,
  // addDoc,
  // setDoc,
  // getDoc,
  // getDocs,
  // arrayUnion,
  // arrayRemove,
  // updateDoc,
  // query,
  // orderBy,
  // where,
  // deleteDoc,
  // serverTimestamp,
  // increment,
  // writeBatch,
  // limit,
  // startAfter,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { app } from "../../config/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
// import {
//   dataFromSnapshot,
//   getUserAdminProfile,
// } from "../../firestore/firestoreServices";
import { listenToCurrentUserAdminProfile } from "./profileUserAdminAction";
import {
  getUserAdminProfile,
  dataFromSnapshot,
} from "../../services/firestoreServices";

const auth = getAuth(app);
const db = getFirestore(app);

export function signInUser(user) {
  return {
    type: SIGN_IN_USER,
    payload: user,
  };
}

export function verifyAuth() {
  return function (dispatch) {
    return onAuthStateChanged(auth, (user) => {
      if (user) {
        user.getIdTokenResult().then((userToken) => {
          const userUpdate = doc(db, "administrator", userToken.claims.user_id);
          updateDoc(userUpdate, {
            admin: userToken.claims.admin,
            premiumAccount: userToken.claims.premiumAccount,
          });
        });
        const profileRef = getUserAdminProfile(user.uid);
        onSnapshot(profileRef, (snapshot) => {
          dispatch(signInUser(dataFromSnapshot(snapshot)));
          dispatch(listenToCurrentUserAdminProfile(dataFromSnapshot(snapshot)));
          dispatch({ type: APP_LOADED });
        });
      } else {
        dispatch(signOutUser());
        dispatch({ type: APP_LOADED });
      }
    });
  };
}

export function signOutUser() {
  return {
    type: SIGN_OUT_USER,
  };
}