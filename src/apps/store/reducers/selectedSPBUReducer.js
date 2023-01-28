import {
  FETCH_SELECTED_DATA_GRAFIK_PEMBELIAN,
  FETCH_SELECTED_DATA_GRAFIK_PENJUALAN_INDUSTRI,
  FETCH_SELECTED_DATA_GRAFIK_PENJUALAN_REGULER,
} from "../constants/grafikConstant";
import { SELECTED_HARGA_SPBU } from "../constants/hargaConstant";
import { SELECTED_INVOICE_SPBU } from "../constants/invoiceConstant";
import { FETCH_ALL_PESAN_SPBU } from "../constants/pesanPendekConstant";
import { FETCH_ALL_PRODUK } from "../constants/produkConstant";
import { SELECTED_SPBU } from "../constants/selectedSPBUConstant";

const initialState = {
  detailSPBU: null,
  hargaProduk: null,
  invoiceTransaksi: null,
  dataGrafikPembelian: null,
  dataGrafikPenjualanReguler: null,
  dataGrafikPenjualanIndustri: null,
  dataPesanPendek: null,
};

export default function selectedSpbuReducer(
  state = initialState,
  { type, payload }
) {
  switch (type) {
    //   case FETCH_ALL_SPBU:
    //     return {
    //       ...state,
    //       spbu: payload,
    //     };
    //   case CREATE_SPBU:
    //     return {
    //       ...state,
    //       spbu: [...state.gerai_spbu, payload],
    //     };
    //   case UPDATE_SPBU:
    //     return {
    //       ...state,
    //       spbu: [...state.spbu.filter((spbu) => spbu.id !== payload.id), payload],
    //     };
    //   case DELETE_SPBU:
    //     return {
    //       ...state,
    //       spbu: [...state.spbu.filter((spbu) => spbu.id !== payload.id), payload],
    //     };

    case SELECTED_SPBU:
      return {
        ...state,
        detailSPBU: payload,
      };
    case FETCH_ALL_PRODUK:
      return {
        ...state,
        produkSPBU: payload,
      };
    case SELECTED_HARGA_SPBU:
      return {
        ...state,
        hargaProduk: payload,
      };
    case SELECTED_INVOICE_SPBU:
      return {
        ...state,
        invoiceTransaksi: payload,
      };
    case FETCH_SELECTED_DATA_GRAFIK_PEMBELIAN:
      return {
        ...state,
        dataGrafikPembelian: payload,
      };
    case FETCH_SELECTED_DATA_GRAFIK_PENJUALAN_REGULER:
      return {
        ...state,
        dataGrafikPenjualanReguler: payload,
      };
    case FETCH_SELECTED_DATA_GRAFIK_PENJUALAN_INDUSTRI:
      return {
        ...state,
        dataGrafikPenjualanIndustri: payload,
      };
    case FETCH_ALL_PESAN_SPBU:
      return {
        ...state,
        dataPesanPendek: payload,
      };
    default:
      return state;
  }
}
