import { FETCH_ALL_PRODUK } from "../constants/produkConstant";

export function listenToAllProduk(produk) {
    return {
      type: FETCH_ALL_PRODUK,
      payload: produk,
    };
  }