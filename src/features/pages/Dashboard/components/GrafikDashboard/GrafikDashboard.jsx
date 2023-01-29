import moment from "moment";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import useFirestoreCollection from "../../../../../apps/hooks/useFirestoreCollection";
import {
  getDataGrafikPembelianFromFirestore,
  getDataGrafikPenjualanRegulerFromFirestore,
} from "../../../../../apps/services/firestoreServices";
import {
  listenToDataGrafikPembelian,
  listenToDataGrafikPenjualanReguler,
} from "../../../../../apps/store/actions/grafikAction";
import GrafikPembelian from "./components/GrafikPembelian";
import GrafikPenjualanIndustri from "./components/GrafikPenjualanIndustri";
import GrafikPenjualanReguler from "./components/GrafikPenjualanReguler";

export default function GrafikDashboard() {
  const dispatch = useDispatch();
  const { pembelian, penjualanReguler, penjualanIndustri } = useSelector(
    (state) => state.dataGrafik
  );
  const { loading } = useSelector((state) => state.async);

  useFirestoreCollection({
    query: () => getDataGrafikPembelianFromFirestore(),
    data: (data) => dispatch(listenToDataGrafikPembelian(data)),
    deps: [dispatch],
  });

  useFirestoreCollection({
    query: () => getDataGrafikPenjualanRegulerFromFirestore(),
    data: (data) => dispatch(listenToDataGrafikPenjualanReguler(data)),
    deps: [dispatch],
  });

  function dataPenjualanReguler(data) {
    const dataBaru = [];
    const date = data
      ?.map(({ tanggalInvoice }) => tanggalInvoice)
      .filter((v, i, a) => a.indexOf(v) === i);

    for (let i = 0; i < date.length; i++) {
      const _tanggal = date[i];
      const objectData = { tanggal: _tanggal };
      for (let i = 0; i < data?.length; i++) {
        if (data[i].tanggalInvoice === _tanggal) {
          data[i].produks?.forEach((element) => {
            var _namaProduk = element.namaProduk;
            objectData[_namaProduk] = objectData[_namaProduk]
              ? objectData[_namaProduk]
              : 0;
            objectData[_namaProduk] += element.jumlahLiter;
          });
        }
      }
      dataBaru.push(objectData);
    }
    return dataBaru;
  }
  
  function dataPenjualanIndustri(data) {
    const dataBaru = [];
    const date = data
      ?.map(({ tanggalInvoice }) => tanggalInvoice)
      .filter((v, i, a) => a.indexOf(v) === i);

    for (let i = 0; i < date.length; i++) {
      const _tanggal = date[i];
      const objectData = { tanggal: _tanggal };
      for (let i = 0; i < data?.length; i++) {
        if (data[i].tanggalInvoice === _tanggal) {
          data[i].produks?.forEach((element) => {
            var _namaProduk = element.namaProduk;
            objectData[_namaProduk] = objectData[_namaProduk]
              ? objectData[_namaProduk]
              : 0;
            objectData[_namaProduk] += element.jumlahLiter;
          });
        }
      }
      dataBaru.push(objectData);
    }
    return dataBaru;
  }

  return (
    <>
      <GrafikPembelian data={pembelian} loading={loading} />
      <GrafikPenjualanReguler
        data={dataPenjualanReguler(penjualanReguler)}
        loading={loading}
      />
      <GrafikPenjualanIndustri
        data={dataPenjualanIndustri(penjualanIndustri)}
        loading={loading}
      />
    </>
  );
}
