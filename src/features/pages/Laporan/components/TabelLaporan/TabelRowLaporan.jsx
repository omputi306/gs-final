import React from "react";
import { TableRow, TableCell, Button } from "@mui/material";
import moment from "moment";

export default function TabelRowLaporan({ item }) {
  return (
    <>
      <TableRow>
        <TableCell rowSpan={item.produks.length + 1}>
          {moment(item.tanggalInvoice).format("DD MMMM YYYY")}
        </TableCell>
        <TableCell rowSpan={item.produks.length + 1}>{item.namaSPBU}</TableCell>
        <TableCell rowSpan={item.produks.length + 1}>
          {item.nomorInvoice}
        </TableCell>
        <TableCell rowSpan={item.produks.length + 1}>
          {item.jenisTransaksi} {item.kategoriPenjualan || null}
        </TableCell>
        <TableCell rowSpan={item.produks.length + 1}>
          <Button href={item.fileInvoice}>Download File Invoice</Button>
        </TableCell>
      </TableRow>
      <>
        {item.produks?.map((produk, index) => {
          return (
            <TableRow key={index}>
              <TableCell>{produk.namaProduk || produk.jenisProduk}</TableCell>
              <TableCell align="right">
                {produk.jumlahLiter.toLocaleString("en-US")} Liter
              </TableCell>
              <TableCell align="right">
                Rp.
                {(produk.hargaperliter * produk.jumlahLiter).toLocaleString(
                  "en-US"
                )}
              </TableCell>
            </TableRow>
          );
        })}
      </>
    </>
  );
}
