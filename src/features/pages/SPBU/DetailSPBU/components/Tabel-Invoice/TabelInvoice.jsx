import React, { useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import TabelRow from "./TabelRow";
import useFirestoreCollection from "../../../../../../apps/hooks/useFirestoreCollection";

export default function TabelInvoice({ data, loading }) {
  const [predicate, setPredicate] = useState(
    new Map([
      ["startDate", new Date()],
      ["endDate", "test"],
      ["filter", "all"],
    ])
  );
  console.log("Tabel Invoice", data);
  return (
    <>
      <Box paddingTop=".8rem" sx={{ flexGrow: 1 }}>
        <Box paddingRight={1} paddingLeft={1}>
          <h2>Invoice SPBU</h2>
        </Box>
        <Grid container spacing={1}>
          <Grid xs={3}>
            <Paper>Side filter</Paper>
          </Grid>
          <Grid xs={9}>
            <Paper sx={{ overflowX: "auto" }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Tanggal</TableCell>
                    <TableCell>ID Produk</TableCell>
                    <TableCell>Jenis Transaksi</TableCell>
                    <TableCell>File Invoice</TableCell>
                    <TableCell>Nama Produk</TableCell>
                    <TableCell align="right">Volume</TableCell>
                    <TableCell align="right">Total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {!loading ? (
                    data?.invoices?.pembelian?.length > 0 ||
                    data?.invoices?.industri?.length > 0 ||
                    data?.invoices?.reguler?.length > 0 ? (
                      <TabelRow rowData={data} loading={loading} />
                    ) : (
                      <TableRow>
                        <TableCell colSpan="7">Tidak ada data</TableCell>
                      </TableRow>
                    )
                  ) : (
                    <TableRow>
                      <TableCell colSpan="7">Loading....</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
