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

export default function GrafikDashboard() {
  const [sortir, setSortir] = useState("DD MMMM YYYY");
  const dispatch = useDispatch();
  const { allInvoice } = useSelector((state) => state.invoices);
  const { pembelian, penjualanReguler, penjualanIndustri } = useSelector(
    (state) => state.dataGrafik
  );
  const { loading } = useSelector((state) => state.async);

  useFirestoreCollection({
    query: () => getAllInvoicesFromFirestore(),
    data: (invoices) => dispatch(listenToAllInvoices(invoices)),
    deps: [dispatch],
  });

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

  console.log("uji coba", dataGrafik(allInvoice));

  return (
    <>
      <Box mb={2} mt={3}>
        <FormControl fullWidth size="small">
          <InputLabel>Filter Grafik</InputLabel>
          <Select
            value={sortir}
            label="Filter per"
            onChange={(e) => setSortir(e.target.value)}
          >
            <MenuItem value={"DD MMMM YYYY"}>Hari</MenuItem>
            <MenuItem value={"MMMM YYYY"}>Bulan</MenuItem>
            <MenuItem value={"YYYY"}>Tahun</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ flexGrow: 1, marginTop: 1 }}>
        <Paper sx={{ padding: "10px" }}>
          <GrafikPembelian
            data={dataGrafik(allInvoice).pembelian}
            loading={loading}
          />
        </Paper>
      </Box>
      <Box sx={{ flexGrow: 1, marginTop: 1 }}>
        <Grid
          marginTop={1}
          container
          spacing={{ xs: 2, md: 2 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          <Grid xs={4} sm={4} md={6}>
            <Paper sx={{ padding: "10px" }}>
              <GrafikPenjualanReguler
                data={dataGrafik(allInvoice).reguler}
                loading={loading}
              />
            </Paper>
          </Grid>
          <Grid xs={4} sm={4} md={6}>
            <Paper sx={{ padding: "10px" }}>
              <GrafikPenjualanIndustri
                data={dataGrafik(allInvoice).industri}
                loading={loading}
              />
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
