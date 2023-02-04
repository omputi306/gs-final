import {
  getFirestore,
  collection,
  Timestamp,
  doc,
  addDoc,
  setDoc,
  getDoc,
  getDocs,
  arrayUnion,
  arrayRemove,
  updateDoc,
  query,
  orderBy,
  where,
  deleteDoc,
  serverTimestamp,
  increment,
  writeBatch,
  limit,
  startAfter,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, getStorage } from "firebase/storage";
import moment from "moment";
import "moment/locale/id";
import { getAuth, updateProfile } from "firebase/auth";
import { app } from "../config/firebase";
// import { array, date } from "yup";
import { v4 } from "uuid";
// import { async } from "@firebase/util";

const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);
const batch = writeBatch(db);

export function dataFromSnapshot(snapshot) {
  if (!snapshot.exists) return undefined;
  const data = snapshot.data();

  for (const prop in data) {
    if (data.hasOwnProperty(prop)) {
      if (data[prop] instanceof Timestamp) {
        data[prop] = data[prop].toDate();
      }
    }
  }

  return {
    ...data,
    id: snapshot.id,
  };
}

// SPBU
export function getAllSpbuFromFirestore() {
  return collection(db, "spbu");
}

export function getSelectedSpbuFromFirestore(id) {
  return doc(db, "spbu", id);
}

export function updateAdminSpbu(values) {
  const spbuRef = doc(db, "spbu", values.spbuUID);
  return updateDoc(spbuRef, {
    admin: values.uid,
  });
}

export function deleteAdminSpbu(values) {
  const spbuRef = doc(db, "spbu", values.spbuUID);
  return updateDoc(spbuRef, {
    admin: null,
  });
}

// produk SPBU

export function getProdukSpbuFromFirestore(id) {
  const colRef = collection(db, "produk");
  return query(
    colRef,
    where("spbuUID", "==", id),
    orderBy("creationDate", "desc"),
    limit(1)
  );
}

export function updateProdukSbpu(values) {
  const spbuRef = doc(db, "spbu", values.spbuUID);
  return updateDoc(spbuRef, {
    produkSPBU: values.produk,
  });
}

export function addHargaProdukToFirestore(values) {
  return addDoc(collection(db, "hargaProduk"), {
    ...values,
    creationDate: serverTimestamp(),
  });
}

export function getHargaProdukFromFirestore(id) {
  const hargaRef = collection(db, "hargaProduk");
  return query(
    hargaRef,
    where("spbuUID", "==", id),
    orderBy("creationDate", "desc"),
    limit(1)
  );
}

// Pesan
// Pesan

export function addPesanToFirestore(values) {
  return addDoc(collection(db, "pesanSingkat"), {
    ...values,
    creationDate: serverTimestamp(),
    clicked: false,
  });
}

export function getAllPesanFromFirestore(id) {
  const colRef = collection(db, "pesanSingkat");
  return query(
    colRef,
    where("to", "==", id),
    limit(10),
    orderBy("creationDate", "desc")
  );
}

export function updateClickedPesan(id) {
  const docRef = doc(db, "pesanSingkat", id);
  return updateDoc(docRef, {
    clicked: true,
  });
}

// Invoice
export function getAllInvoicesFromFirestore() {
  const colRef = collection(db, "invoices");
  return query(colRef, orderBy("tanggalInvoice", "asc"));
  // return collection(db, "invoices"), orderBy("tanggalInvoice", "asc");
}

export function getSelectedSpbuInvoicesFromFirestore(id) {
  const colRef = collection(db, "invoices");
  return query(colRef, where("spbuUID", "==", id));
}

export function addInvoiceToFirestore({ values, url }) {
  if (values.jenisTransaksi === "Penjualan") {
    return setDoc(doc(db, "invoices", values.nomorInvoice), {
      spbuUID: values.spbuUID,
      namaSPBU: values.namaSPBU,
      nomorInvoice: values.nomorInvoice,
      totalHarga: values.totalHarga,
      jenisTransaksi: values.jenisTransaksi,
      kategoriPenjualan: values.kategoriPenjualan,
      creationDate: serverTimestamp(),
      tanggalInvoice: values.tanggalInvoice,
      fileInvoice: url,
      approved: false,
      tanggalApprove: null,
      produks: values.produks,
      date: {
        bulan: moment(values.tanggalInvoice).format("MM"),
        tahun: moment(values.tanggalInvoice).format("YYYY"),
      },
    });
  } else {
    return setDoc(doc(db, "invoices", values.nomorInvoice), {
      spbuUID: values.spbuUID,
      namaSPBU: values.namaSPBU,
      nomorInvoice: values.nomorInvoice,
      totalHarga: values.totalHarga,
      jenisTransaksi: values.jenisTransaksi,
      creationDate: serverTimestamp(),
      fileInvoice: url,
      terimaBarang: false,
      approved: false,
      tanggalRencanaPenyerahan: values.tanggalRencanaPenyerahan,
      tanggalInvoice: values.tanggalInvoice,
      tanggalApprove: null,
      produks: values.produks,
      date: {
        bulan: moment(values.tanggalInvoice).format("MM"),
        tahun: moment(values.tanggalInvoice).format("YYYY"),
      },
    });
  }
}

export function uploadFileInvoiceToFirestore({ file, values }) {
  const invoiceRef = ref(storage, `fileInvoice/${file.name + v4()}`);
  const uploadFile = uploadBytes(invoiceRef, file);
  return uploadFile.then((snapshot) => {
    getDownloadURL(snapshot.ref).then((url) => {
      return addInvoiceToFirestore({ values, url });
    });
  });
}

// Grafik

export function getDataGrafikPembelianFromFirestore() {
  const colRef = collection(db, "invoices");
  return query(colRef, where("jenisTransaksi", "==", "Pembelian"));
}
export function getDataGrafikPenjualanRegulerFromFirestore() {
  const colRef = collection(db, "invoices");
  return query(colRef, where("kategoriPenjualan", "==", "Reguler"));
}

export function getDataGrafikPenjualanRegulerGeraiFromFirestore(id) {
  const colRef = collection(db, "invoices");
  return query(
    colRef,
    where("spbuUID", "==", id),
    where("kategoriPenjualan", "==", "Reguler"),
    orderBy("tanggalInvoice", "asc")
  );
}

export function getDataGrafikPenjualanIndustriGeraiFromFirestore(id) {
  const colRef = collection(db, "invoices");
  return query(
    colRef,
    where("spbuUID", "==", id),
    where("kategoriPenjualan", "==", "Industri"),
    orderBy("tanggalInvoice", "asc")
  );
}

export function getDataGrafikPembelianGeraiFromFirestore(id) {
  const colRef = collection(db, "invoices");
  return query(
    colRef,
    where("spbuUID", "==", id),
    where("jenisTransaksi", "==", "Pembelian"),
    orderBy("tanggalInvoice", "asc")
  );
}

// User
export function getAllUserFromFirestore() {
  return collection(db, "administrator");
}

export function getUserAdminProfile(uid) {
  return doc(db, "administrator", uid);
}

export function addUserToFirestore(user) {
  return setDoc(doc(db, "administrator", user.uid), {
    ...user,
  });
}

export async function updateUserSpbu(values) {
  const docRef = doc(db, "administrator", values.uid);
  try {
    updateDoc(docRef, { spbu: values.spbuUID }).then(() => {
      return updateAdminSpbu(values);
    });
  } catch (error) {
    return error;
  }
}

export async function deleteUserSpbu({ uid, spbu }) {
  const docRef = doc(db, "administrator", uid);
  try {
    updateDoc(docRef, { spbu: null }).then(() => {
      return deleteAdminSpbu(spbu);
    });
  } catch (error) {
    return error;
  }
}
