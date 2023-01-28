import {
  FETCH_ALL_HARGA,
  SELECTED_HARGA,
  SELECTED_HARGA_SPBU,
} from "../constants/hargaConstant";

export function listenToAllHarga(harga) {
  return {
    type: FETCH_ALL_HARGA,
    payload: harga,
  };
}
export function listenToSelectedHarga(harga) {
  return {
    type: SELECTED_HARGA,
    payload: harga,
  };
}
export function listenToSelectedHargaSPBU(harga) {
  return {
    type: SELECTED_HARGA_SPBU,
    payload: harga,
  };
}
