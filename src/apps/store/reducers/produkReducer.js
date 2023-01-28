import { FETCH_ALL_PRODUK } from "../constants/produkConstant";
  
  const initialState = {
    produkSPBU: null,
  };
  
  export default function produkReducer(state = initialState, { type, payload }) {
    switch (type) {
      case FETCH_ALL_PRODUK:
        return {
          ...state,
          produkSPBU: payload,
        };
      default:
        return state;
    }
  }
  