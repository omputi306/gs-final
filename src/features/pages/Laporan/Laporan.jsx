import React, { useState } from "react";
import {
  Box,
  Button,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Card,
  CardHeader,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { useEffect } from "react";
import { DateRange, DateRangePicker } from "react-date-range";
import { useDispatch, useSelector } from "react-redux";
import useFirestoreCollection from "../../../apps/hooks/useFirestoreCollection";
import { getAllInvoicesFromFirestore } from "../../../apps/services/firestoreServices";
import { listenToAllInvoices } from "../../../apps/store/actions/invoiceAction";
import TabelLaporan from "./components/TabelLaporan/TabelLaporan";

export default function Laporan() {
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const { allInvoice } = useSelector((state) => state.invoices);
  const { loading } = useSelector((state) => state.async);
  const [invoices, setInvoices] = useState(allInvoice);

  console.log("Invoices", invoices);

  useFirestoreCollection({
    query: () => getAllInvoicesFromFirestore(),
    data: (invoicesData) => dispatch(listenToAllInvoices(invoicesData)),
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
  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };

  //   console.log("invoice", allInvoice)
  if (loading) return <>Loading</>;

  return (
    <section>
      <div className="main">
        Laporan
        <Grid
          marginTop={1}
          container
          spacing={{ xs: 2, md: 2 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          <Grid xs={4} sm={4} md={9}>
            <Card>
              <CardHeader></CardHeader>
              <TabelLaporan dataTabel={invoices} />
            </Card>
          </Grid>
          <Grid xs={4} sm={4} md={3}>
            <Paper sx={{ height: "fit-content", width: "fit-content" }}>
              {!loading ? (
                <DateRange ranges={[selectionRange]} onChange={handleSelect} />
              ) : null}
            </Paper>
          </Grid>
        </Grid>
      </div>
    </section>
  );
}
