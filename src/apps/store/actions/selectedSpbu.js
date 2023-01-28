import { SELECTED_SPBU } from "../constants/selectedSPBUConstant";

export function listenToSelectedSPBU(spbu) {
    return {
      type: SELECTED_SPBU,
      payload: spbu,
    };
  }