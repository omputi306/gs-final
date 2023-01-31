import React, { useRef } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  TablePagination,
  Box,
  Button,
} from "@mui/material";
import TabelRowLaporan from "./TabelRowLaporan";
import { DownloadTableExcel } from "react-export-table-to-excel";

export default function TabelLaporan({ dataTabel, loading }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const tableRef = useRef(null);

  return (
    <>
      <Box>
        <DownloadTableExcel
          filename={`Laporan Transaksi ${new Date()}`}
          sheet="transaksi"
          currentTableRef={tableRef.current}
        >
          <Button> Export excel </Button>
        </DownloadTableExcel>
      </Box>
      <TableContainer>
        <Table ref={tableRef}>
          <TableHead>
            <TableRow>
              <TableCell>Tanggal</TableCell>
              <TableCell>Nama SPBU</TableCell>
              <TableCell>Nomor Invoice</TableCell>
              <TableCell>Jenis Transaksi</TableCell>
              <TableCell>File Invoice</TableCell>
              <TableCell>Nama Produk</TableCell>
              <TableCell align="right">Volume</TableCell>
              <TableCell align="right">Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!loading ? (
              dataTabel?.length > 0 ? (
                dataTabel
                  ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  ?.map((item, index) => (
                    <TabelRowLaporan item={item} key={index} />
                  ))
              ) : (
                <TableRow>
                  <TableCell colSpan="8">Silahkan Pilih Tanggal</TableCell>
                </TableRow>
              )
            ) : (
              <TableRow>
                <TableCell colSpan="8">Loading....</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[3, 10, 25, 100]}
          component="div"
          count={dataTabel?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </>
  );
}
