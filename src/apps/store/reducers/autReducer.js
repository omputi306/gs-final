import { SIGN_IN_USER, SIGN_OUT_USER } from "../constants/authConstant";

const initialState = {
  authenticated: false,
  currentUserLogin: null
};

export default function authReducer(state = initialState, { type, payload }) {
  switch (type) {
    case SIGN_IN_USER:
      return {
        ...state,
        authenticated: true,
        currentUserLogin: {
          email: payload.email,
          photoURL: payload.photoURL,
          uid: payload.uid,
          displayName: payload.displayName,
          spbu: payload.spbu,
          admin: payload.admin,
          premiumAccount: payload.premiumAccount
        },
      };
    case SIGN_OUT_USER:
      return {
        ...state,
        authenticated: false,
        currentUserLogin: null,
      };
    default:
      return state;
  }
}