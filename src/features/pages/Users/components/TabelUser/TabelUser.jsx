import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";

export default function TabelUser({ listUser, loading }) {
  return (
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>NO.</TableCell>
            <TableCell>USER ID</TableCell>
            <TableCell>NAMA USER</TableCell>
            <TableCell>EMAIL</TableCell>
            <TableCell>ACTION</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {!loading ? (
            listUser?.length > 0 ? (
              listUser?.map((item, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{item.uid}</TableCell>
                    <TableCell>{item.displayName}</TableCell>
                    <TableCell>{item.email}</TableCell>
                    <TableCell>
                      <IconButton>Lihat</IconButton>
                      <IconButton>Edit</IconButton>
                      <IconButton>Hapus</IconButton>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan="5">Belum ada users</TableCell>
              </TableRow>
            )
          ) : (
            <TableRow>
              <TableCell colSpan="5">Loading...</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Paper>
  );
}
