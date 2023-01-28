import {
  FETCH_ALL_SPBU,
  CREATE_SPBU,
  UPDATE_SPBU,
  DELETE_SPBU,
} from "../constants/spbuConstant";

export function listenToAllSPBU(spbu) {
  return {
    type: FETCH_ALL_SPBU,
    payload: spbu,
  };
}
