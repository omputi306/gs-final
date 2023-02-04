import React, { useState } from "react";
import moment from "moment";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Paper,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { useDispatch, useSelector } from "react-redux";
import useFirestoreCollection from "../../../../../apps/hooks/useFirestoreCollection";
import { getAllInvoicesFromFirestore } from "../../../../../apps/services/firestoreServices";
import { listenToAllInvoices } from "../../../../../apps/store/actions/invoiceAction";
import GrafikPembelian from "./components/GrafikPembelian";
import GrafikPenjualanIndustri from "./components/GrafikPenjualanIndustri";
import GrafikPenjualanReguler from "./components/GrafikPenjualanReguler";

export default function GrafikDashboard({ sortir, invoices, loading }) {
  
  function dataGrafik(data) {
    const dataBaru = {
      reguler: [],
      industri: [],
      pembelian: [],
    };

    const date = data
      ?.map(({ tanggalInvoice }) => moment(tanggalInvoice).format(sortir))
      .filter((v, i, a) => a.indexOf(v) === i);

    for (let i = 0; i < date?.length; i++) {
      const _tanggal = date[i];
      const objectDataReguler = { tanggal: _tanggal };
      const objectDataIndustri = { tanggal: _tanggal };
      const objectDataPembelian = { tanggal: _tanggal };
      for (let i = 0; i < data?.length; i++) {
        if (moment(data[i].tanggalInvoice).format(sortir) === _tanggal) {
          if (data[i].jenisTransaksi === "Penjualan") {
            if (data[i].kategoriPenjualan === "Reguler") {
              data[i].produks?.forEach((element) => {
                var _namaProduk = element.namaProduk;
                objectDataReguler[_namaProduk] = objectDataReguler[_namaProduk]
                  ? objectDataReguler[_namaProduk]
                  : 0;
                objectDataReguler[_namaProduk] += element.jumlahLiter;
              });
            } else {
              data[i].produks?.forEach((element) => {
                var _namaProduk = element.namaProduk;
                objectDataIndustri[_namaProduk] = objectDataIndustri[
                  _namaProduk
                ]
                  ? objectDataIndustri[_namaProduk]
                  : 0;
                objectDataIndustri[_namaProduk] += element.jumlahLiter;
              });
            }
          } else {
            data[i].produks?.forEach((element) => {
              var _namaProduk = element.jenisProduk;
              objectDataPembelian[_namaProduk] = objectDataPembelian[
                _namaProduk
              ]
                ? objectDataPembelian[_namaProduk]
                : 0;
              objectDataPembelian[_namaProduk] += element.jumlahLiter;
            });
          }
        }
      }
      dataBaru.reguler.push(objectDataReguler);
      dataBaru.industri.push(objectDataIndustri);
      dataBaru.pembelian.push(objectDataPembelian);
    }
    return dataBaru;
  }

  return (
    <>
      <Box sx={{ flexGrow: 1, marginTop: 0 }}>
        <Paper sx={{ padding: "10px" }}>
          <GrafikPembelian
            data={dataGrafik(invoices).pembelian}
            loading={loading}
          />
        </Paper>
      </Box>
      <Box sx={{ flexGrow: 1, marginTop: 0 }}>
        <Grid
          marginTop={1}
          container
          spacing={{ xs: 1, md: 1 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
          p={0}
        >
          <Grid xs={4} sm={4} md={6}>
            <Paper sx={{ padding: "10px" }}>
              <GrafikPenjualanReguler
                data={dataGrafik(invoices).reguler}
                loading={loading}
              />
            </Paper>
          </Grid>
          <Grid xs={4} sm={4} md={6}>
            <Paper sx={{ padding: "10px" }}>
              <GrafikPenjualanIndustri
                data={dataGrafik(invoices).industri}
                loading={loading}
              />
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
