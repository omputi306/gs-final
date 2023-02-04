import React from "react";
import { Box, Paper, Tooltip, Button, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { useDispatch, useSelector } from "react-redux";
import useFirestoreCollection from "../../../../../apps/hooks/useFirestoreCollection";
import {
  getDataGrafikPembelianGeraiFromFirestore,
  getDataGrafikPenjualanIndustriGeraiFromFirestore,
  getDataGrafikPenjualanRegulerGeraiFromFirestore,
  getSelectedSpbuFromFirestore,
  getSelectedSpbuInvoicesFromFirestore,
} from "../../../../../apps/services/firestoreServices";
import {
  listenToSelectedDataGrafikPembelian,
  listenToSelectedDataGrafikPenjualanIndustri,
  listenToSelectedDataGrafikPenjualanReguler,
} from "../../../../../apps/store/actions/grafikAction";
import GrafikPembelian from "../../../SPBU/DetailSPBU/components/GrafikSPBU/GrafikPembelian";
import GrafikPenjualanIndustri from "../../../SPBU/DetailSPBU/components/GrafikSPBU/GrafikPenjualanIndustri";
import GrafikPenjualanReguler from "../../../SPBU/DetailSPBU/components/GrafikSPBU/GrafikPenjualanReguler";
import { listenToSelectedInvoicesSPBU } from "../../../../../apps/store/actions/invoiceAction";
import InsightCard from "../../../SPBU/DetailSPBU/components/InsightCard/InsightCard";
import { openDialog } from "../../../../../apps/store/reducers/dialogReducer";
import useFirestoreDoc from "../../../../../apps/hooks/useFirestoreDoc";
import { listenToSelectedSPBU } from "../../../../../apps/store/actions/selectedSpbu";

export default function GrafikRingkasanSpbu({ id, loading }) {
  const dispatch = useDispatch();
  const {
    detailSPBU,
    invoiceTransaksi,
    dataGrafikPembelian,
    dataGrafikPenjualanReguler,
    dataGrafikPenjualanIndustri,
  } = useSelector((state) => state.selectedSPBU);

  useFirestoreDoc({
    query: () => getSelectedSpbuFromFirestore(id),
    data: (spbu) => dispatch(listenToSelectedSPBU(spbu)),
    deps: [dispatch, id],
  });

  useFirestoreCollection({
    query: () => getSelectedSpbuInvoicesFromFirestore(id),
    data: (invoices) => dispatch(listenToSelectedInvoicesSPBU(invoices)),
    deps: [dispatch, id],
  });

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
    <Box mt={3}>
      <Box>
        <Grid container spacing={2}>
          <InsightCard
            data={detailSPBU}
            dataTransaksi={invoiceTransaksi}
            loading={loading}
          />
        </Grid>
        <Box mt={2} p={0}>
          <Paper
            sx={{
              padding: "10px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Tooltip title="Buat Pesan Baru">
              <Button
                variant="contained"
                color="warning"
                onClick={() =>
                  dispatch(
                    openDialog({
                      dialogType: "ComposePesan",
                      dialogData: {
                        spbuUID: id,
                      },
                    })
                  )
                }
              >
                Tulis Pesan
              </Button>
            </Tooltip>
            <Typography>Kirim pesan kepada petugas SPBU</Typography>
          </Paper>
        </Box>
      </Box>
      <Grid
        marginTop={1}
        container
        spacing={{ xs: 2, md: 2 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        <Grid xs={4} sm={4} md={4}>
          <Paper sx={{ padding: "10px" }}>
            <GrafikPembelian data={dataGrafikPembelian} loading={loading} />
          </Paper>
        </Grid>
        <Grid xs={4} sm={4} md={4}>
          <Paper sx={{ padding: "10px" }}>
            <GrafikPenjualanReguler
              data={dataGrafikPenjualanReguler}
              loading={loading}
            />
          </Paper>
        </Grid>
        <Grid xs={4} sm={4} md={4}>
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
