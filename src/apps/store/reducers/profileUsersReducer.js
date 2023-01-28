import { FETCH_ALL_USER } from "../constants/profileUserConstant";
  
  const initialState = {
    listUser: [],
  };
  
  export default function profileUserReducer(state = initialState, { type, payload }) {
    switch (type) {
      case FETCH_ALL_USER:
        return {
          ...state,
          listUser: payload,
        };
      default:
        return state;
    }
  }