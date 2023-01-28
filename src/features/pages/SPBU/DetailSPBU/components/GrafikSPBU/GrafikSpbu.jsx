import { CardHeader, Paper } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { Box } from "@mui/system";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import useFirestoreCollection from "../../../../../../apps/hooks/useFirestoreCollection";
import {
  getDataGrafikPembelianGeraiFromFirestore,
  getDataGrafikPenjualanIndustriGeraiFromFirestore,
  getDataGrafikPenjualanRegulerGeraiFromFirestore,
} from "../../../../../../apps/services/firestoreServices";
import {
  listenToSelectedDataGrafikPembelian,
  listenToSelectedDataGrafikPenjualanIndustri,
  listenToSelectedDataGrafikPenjualanReguler,
} from "../../../../../../apps/store/actions/grafikAction";
import ListPesan from "../Pesan/ListPesan";
import GrafikPembelian from "./GrafikPembelian";
import GrafikPenjualanIndustri from "./GrafikPenjualanIndustri";
import GrafikPenjualanReguler from "./GrafikPenjualanReguler";

export default function GrafikSpbu({ id, pesanPendek, loading }) {
  const dispatch = useDispatch();
  const {
    dataGrafikPembelian,
    dataGrafikPenjualanReguler,
    dataGrafikPenjualanIndustri,
  } = useSelector((state) => state.selectedSPBU);

  useFirestoreCollection({
    query: () => getDataGrafikPembelianGeraiFromFirestore(id),
    data: (data) => dispatch(listenToSelectedDataGrafikPembelian(data)),
    deps: [dispatch, id],
  });

  useFirestoreCollection({
    query: () => getDataGrafikPenjualanRegulerGeraiFromFirestore(id),
    data: (data) => dispatch(listenToSelectedDataGrafikPenjualanReguler(data)),
    deps: [dispatch, id],
  });

  useFirestoreCollection({
    query: () => getDataGrafikPenjualanIndustriGeraiFromFirestore(id),
    data: (data) => dispatch(listenToSelectedDataGrafikPenjualanIndustri(data)),
    deps: [dispatch, id],
  });

  return (
    <Box sx={{ flexGrow: 1, marginTop: 1 }}>
      <Grid
        marginTop={1}
        container
        spacing={{ xs: 2, md: 2 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        <Grid xs={4} sm={4} md={8}>
          <Paper sx={{ padding: "10px" }}>
            <GrafikPembelian data={dataGrafikPembelian} loading={loading} />
          </Paper>
        </Grid>
        <Grid xs={4} sm={4} md={4}>
          <h2>Pesan Singkat</h2>
          <Paper sx={{ height: "309px", overflowY: "scroll"}}>
            <ListPesan data={pesanPendek} loading={loading} />
          </Paper>
        </Grid>
        <Grid xs={4} sm={4} md={6}>
          <Paper sx={{ padding: "10px" }}>
            <GrafikPenjualanReguler
              data={dataGrafikPenjualanReguler}
              loading={loading}
            />
          </Paper>
        </Grid>
        <Grid xs={4} sm={4} md={6}>
          <Paper sx={{ padding: "10px" }}>
            <GrafikPenjualanIndustri
              data={dataGrafikPenjualanIndustri}
              loading={loading}
            />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
