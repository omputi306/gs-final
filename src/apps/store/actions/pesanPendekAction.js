import {
  FETCH_ALL_PESAN,
  FETCH_ALL_PESAN_SPBU,
} from "../constants/pesanPendekConstant";

export function listenToAllPesan(pesan) {
  return {
    type: FETCH_ALL_PESAN,
    payload: pesan,
  };
}

export function listenToAllPesanSPBU(pesan) {
  return {
    type: FETCH_ALL_PESAN_SPBU,
    payload: pesan,
  };
}
