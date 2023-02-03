import React, { useState } from "react";
import {
  Card,
  Paper,
  Box,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import GrafikDashboard from "./components/GrafikDashboard/GrafikDashboard";
import { useDispatch, useSelector } from "react-redux";
import { DateRangePicker } from "react-date-range";
import useFirestoreCollection from "../../../apps/hooks/useFirestoreCollection";
import {
  getAllInvoicesFromFirestore,
  getAllSpbuFromFirestore,
} from "../../../apps/services/firestoreServices";
import { listenToAllInvoices } from "../../../apps/store/actions/invoiceAction";
import { listenToAllPesanSPBU } from "../../../apps/store/actions/pesanPendekAction";
import { listenToAllSPBU } from "../../../apps/store/actions/listSpbuAction";
import GrafikSpbu from "../SPBU/DetailSPBU/components/GrafikSPBU/GrafikSpbu";

export default function Dashboard() {
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [sortir, setSortir] = useState("DD MMMM YYYY");
  const { allInvoice } = useSelector((state) => state.invoices);
  const { loading } = useSelector((state) => state.async);
  const [invoices, setInvoices] = useState(allInvoice);
  const { spbu } = useSelector((state) => state.listSPBU);
  const [spbuID, setSPBUID] = React.useState("");

  console.log("Invoices", spbu);

  useFirestoreCollection({
    query: () => getAllInvoicesFromFirestore(),
    data: (invoicesData) => dispatch(listenToAllInvoices(invoicesData)),
    deps: [dispatch],
  });

  useFirestoreCollection({
    query: () => getAllSpbuFromFirestore(),
    data: (spbu) => dispatch(listenToAllSPBU(spbu)),
    deps: [dispatch],
  });

  const handleSelect = (date) => {
    let filtered = allInvoice?.filter((e) => {
      let invoiceDate = new Date(e["tanggalInvoice"]);
      return (
        invoiceDate >= date.selection.startDate &&
        invoiceDate <= date.selection.endDate
      );
    });
    setStartDate(date.selection.startDate);
    setEndDate(date.selection.endDate);
    setInvoices(filtered);
  };

  const handleChange = (event) => {
    setSPBUID(event.target.value);
  };

  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };

  return (
    <section>
      <div className="main">
        <h1>Dashboard</h1>
        <Grid
          marginTop={1}
          container
          spacing={{ xs: 2, md: 2 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          <Grid xs={4} sm={4} md={7}>
            <GrafikDashboard
              invoices={invoices}
              sortir={sortir}
              loading={loading}
            />
          </Grid>
          <Grid xs={4} sm={4} md={5}>
            {!loading ? (
              <>
                <Paper sx={{ height: "fit-content", width: "fit-content" }}>
                  <DateRangePicker
                    ranges={[selectionRange]}
                    onChange={handleSelect}
                  />
                </Paper>
                <Box component={Paper} mb={2} mt={2}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Populasi Grafik</InputLabel>
                    <Select
                      value={sortir}
                      label="Populasi Grafik"
                      onChange={(e) => setSortir(e.target.value)}
                    >
                      <MenuItem value={"DD MMMM YYYY"}>Hari</MenuItem>
                      <MenuItem value={"MMMM YYYY"}>Bulan</MenuItem>
                      <MenuItem value={"YYYY"}>Tahun</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                <Paper
                  sx={{
                    height: "172px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  Fiter SPBU
                  <Box sx={{ minWidth: 150, maxWidth: 150, mt: 3 }}>
                    <FormControl size="small" fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Pilih SPBU...
                      </InputLabel>
                      <Select
                        // labelId="demo-simple-select-label"
                        // id="demo-simple-select"
                        value={spbuID}
                        label="PILIH SPBU..."
                        onChange={handleChange}
                      >
                        <MenuItem value="">
                          <em>Pilih SPBU....</em>
                        </MenuItem>
                        {spbu?.map((item) => (
                          <MenuItem key={item.spbuUID} value={item.spbuUID}>
                            {item.namaSPBU}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                </Paper>
              </>
            ) : null}
          </Grid>
        </Grid>
        {!spbuID ? (
          <Box mt="10px">
            <Paper
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "50px",
              }}
            >
              PILIH SPBU TERLEBIH DAHULU
            </Paper>
          </Box>
        ) : (
          <GrafikSpbu id={spbuID} loading={loading} />
        )}
      </div>
    </section>
  );
}
