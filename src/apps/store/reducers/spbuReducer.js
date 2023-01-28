import {
  FETCH_ALL_SPBU,
  CREATE_SPBU,
  DELETE_SPBU,
  UPDATE_SPBU,
} from "../constants/spbuConstant";

const initialState = {
  spbu: [],
};

export default function spbuReducer(state = initialState, { type, payload }) {
  switch (type) {
    case FETCH_ALL_SPBU:
      return {
        ...state,
        spbu: payload,
      };
    case CREATE_SPBU:
      return {
        ...state,
        spbu: [...state.gerai_spbu, payload],
      };
    case UPDATE_SPBU:
      return {
        ...state,
        spbu: [...state.spbu.filter((spbu) => spbu.id !== payload.id), payload],
      };
    case DELETE_SPBU:
      return {
        ...state,
        spbu: [...state.spbu.filter((spbu) => spbu.id !== payload.id), payload],
      };
    default:
      return state;
  }
}
