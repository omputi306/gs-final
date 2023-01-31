import { FETCH_ALL_INVOICE } from "../constants/invoiceConstant";
  
  const initialState = {
    allInvoice: null,
  };
  
  export default function invoiceReducer(state = initialState, { type, payload }) {
    switch (type) {
      case FETCH_ALL_INVOICE:
        return {
          ...state,
          allInvoice: payload,
        };
      default:
        return state;
    }
  }