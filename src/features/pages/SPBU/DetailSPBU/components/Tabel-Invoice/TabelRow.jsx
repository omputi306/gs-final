import { TableCell, TableRow } from "@mui/material";
import moment from "moment";
import React from "react";

export default function TabelRow({ rowData, loading }) {
  return (
    <>
      {rowData.invoices?.pembelian?.map((item) => (
        <>
          <TableRow>
            <TableCell rowSpan={item.item.length + 1}>
              {moment(item.tanggal).format("DD-MM-YYYY")}
            </TableCell>
            <TableCell rowSpan={item.item.length + 1}>
              {item.nomorInvoice}
            </TableCell>
            <TableCell rowSpan={item.item.length + 1}>Pembelian</TableCell>
            <TableCell rowSpan={item.item.length + 1}>fileInvoice</TableCell>
          </TableRow>
          <>
            {item.item?.map((i) => (
              <TableRow>
                <TableCell>{i.jenisProduk}</TableCell>
                <TableCell align="right">
                  {i.jumlahLiter.toLocaleString("en-US")} Liter
                </TableCell>
                <TableCell align="right">
                  Rp.{(i.hargaperliter * i.jumlahLiter).toLocaleString("en-US")}
                </TableCell>
              </TableRow>
            ))}
          </>
        </>
      ))}
      {rowData.invoices?.reguler?.map((item) => (
        <>
          <TableRow>
            <TableCell rowSpan={item.item.length + 1}>
              {moment(item.tanggal).format("DD-MM-YYYY")}
            </TableCell>
            <TableCell rowSpan={item.item.length + 1}>
              {item.nomorInvoice}
            </TableCell>
            <TableCell rowSpan={item.item.length + 1}>
              Penjualan Reguler
            </TableCell>
            <TableCell rowSpan={item.item.length + 1}>fileInvoice</TableCell>
          </TableRow>
          <>
            {item.item?.map((i) => (
              <TableRow>
                <TableCell>{i.namaProduk}</TableCell>
                <TableCell align="right">
                  {i.jumlahLiter.toLocaleString("en-US")} Liter
                </TableCell>
                <TableCell align="right">
                  Rp.{(i.hargaperliter * i.jumlahLiter).toLocaleString("en-US")}
                </TableCell>
              </TableRow>
            ))}
          </>
        </>
      ))}
      {rowData.invoices?.industri?.map((item, index) => {
        return (
          <>
            <TableRow>
              <TableCell rowSpan={item.item.length + 1}>
                {moment(item.tanggal).format("DD-MM-YYYY")}
              </TableCell>
              <TableCell rowSpan={item.item.length + 1}>
                {item.nomorInvoice}
              </TableCell>
              <TableCell rowSpan={item.item.length + 1}>
                Penjualan Industri
              </TableCell>
              <TableCell rowSpan={item.item.length + 1}>fileInvoice</TableCell>
            </TableRow>
            <>
              {item.item?.map((i) => (
                <TableRow>
                  <TableCell>{i.namaProduk}</TableCell>
                  <TableCell align="right">
                    {i.jumlahLiter.toLocaleString("en-US")} Liter
                  </TableCell>
                  <TableCell align="right">
                    Rp.
                    {(i.hargaperliter * i.jumlahLiter).toLocaleString("en-US")}
                  </TableCell>
                </TableRow>
              ))}
            </>
          </>
        );
      })}
    </>
  );
}
