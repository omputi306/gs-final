import {
  FETCH_DATA_GRAFIK_PEMBELIAN,
  FETCH_DATA_GRAFIK_PENJUALAN_INDUSTRI,
  FETCH_DATA_GRAFIK_PENJUALAN_REGULER,
} from "../constants/grafikConstant";

const initialState = {
  pembelian: [],
  penjualanReguler: [],
  penjualanIndustri: [],
};

export default function grafikReducer(state = initialState, { type, payload }) {
  switch (type) {
    case FETCH_DATA_GRAFIK_PEMBELIAN:
      return {
        ...state,
        pembelian: payload,
      };
    case FETCH_DATA_GRAFIK_PENJUALAN_REGULER:
      return {
        ...state,
        penjualanReguler: payload,
      };
    case FETCH_DATA_GRAFIK_PENJUALAN_INDUSTRI:
      return {
        ...state,
        penjualanIndustri: payload,
      };
    default:
      return state;
  }
}
