import asyncReducer from "./asyncReducer";
import dialogReducer from "./dialogReducer";
import grafikReducer from "./grafikReducer";
import invoiceReducer from "./invoiceReducer";
import profileUserReducer from "./profileUsersReducer";
// import produkReducer from "./produkReducer";
import selectedSpbuReducer from "./selectedSPBUReducer";
import spbuReducer from "./spbuReducer";
// import dialogReducer from "./dialogReducer";
// import geraiSPBUReducer from "./geraiSPBUReducer";
// import authReducer from "./authReducer";
// import profileUserAdminReducer from "./profileUserAdminReducer";
// import reportsReducer from "./reportsReducer";
// import invoiceReducer from "./invoiceReducer";
// import hargaReducer from "./hargaReducer";
// import grafikPenjualanRegulerGeraiReducer from "./grafikPenjualanRegulerGeraiReducer";
// import grafikPembelianGeraiReducer from "./grafikPembelianGeraiReducer";
// import grafikPenjualanIndustriGeraiReducer from "./grafikPenjualanRegulerIndustriReducer";

const rootReducers = {
  async: asyncReducer,
  listSPBU: spbuReducer,
  selectedSPBU: selectedSpbuReducer,
  dialogs: dialogReducer,
  dataGrafik: grafikReducer,
  //   spbu: geraiSPBUReducer,
  //   auth: authReducer,
  users: profileUserReducer,
  //   reports: reportsReducer,
  invoices: invoiceReducer,
  //   produk: produkReducer,
  //   harga: hargaReducer,
  //   dataRegulerGerai: grafikPenjualanRegulerGeraiReducer,
  //   dataIndustriGerai: grafikPenjualanIndustriGeraiReducer,
  //   dataPembelianGerai: grafikPembelianGeraiReducer
};

export default rootReducers;
