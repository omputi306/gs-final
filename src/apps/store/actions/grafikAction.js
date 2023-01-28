import {
  FETCH_DATA_GRAFIK_PEMBELIAN,
  FETCH_DATA_GRAFIK_PENJUALAN_INDUSTRI,
  FETCH_DATA_GRAFIK_PENJUALAN_REGULER,
  FETCH_SELECTED_DATA_GRAFIK_PEMBELIAN,
  FETCH_SELECTED_DATA_GRAFIK_PENJUALAN_INDUSTRI,
  FETCH_SELECTED_DATA_GRAFIK_PENJUALAN_REGULER,
} from "../constants/grafikConstant";

export function listenToDataGrafikPembelian(data) {
  return {
    type: FETCH_DATA_GRAFIK_PEMBELIAN,
    payload: data,
  };
}
export function listenToDataGrafikPenjualanReguler(data) {
  return {
    type: FETCH_DATA_GRAFIK_PENJUALAN_REGULER,
    payload: data,
  };
}
export function listenToDataGrafikPenjualanIndustri(data) {
  return {
    type: FETCH_DATA_GRAFIK_PENJUALAN_INDUSTRI,
    payload: data,
  };
}
export function listenToSelectedDataGrafikPembelian(data) {
  return {
    type: FETCH_SELECTED_DATA_GRAFIK_PEMBELIAN,
    payload: data,
  };
}
export function listenToSelectedDataGrafikPenjualanReguler(data) {
  return {
    type: FETCH_SELECTED_DATA_GRAFIK_PENJUALAN_REGULER,
    payload: data,
  };
}
export function listenToSelectedDataGrafikPenjualanIndustri(data) {
  return {
    type: FETCH_SELECTED_DATA_GRAFIK_PENJUALAN_INDUSTRI,
    payload: data,
  };
}
