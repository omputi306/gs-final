import {
  Paper,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import truncate from "just-truncate";
import React from "react";
import { useSelector } from "react-redux";
import ChipUser from "./ChipUser/ChipUser";

export default function TabelSPBU({ data, listUser, loading }) {
  // if (loading) return <>Loading...</>
  
  return (
    <Paper>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>ID SPBU</TableCell>
            <TableCell>Nama SPBU</TableCell>
            <TableCell>Alamat SPBU</TableCell>
            <TableCell>Admin</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {!loading ? (
            data?.map((item, index) => {
              return (
                <TableRow key={index}>
                  <TableCell>{item.spbuUID}</TableCell>
                  <TableCell>{item.namaSPBU}</TableCell>
                  <TableCell>
                    {truncate(
                      `${item.alamatSPBU.alamat} RT${item.alamatSPBU.rt}/RW
                    ${item.alamatSPBU.rw} ${item.alamatSPBU.kelurahan}{" "}
                    ${item.alamatSPBU.kecamatan} ${item.alamatSPBU.kota}{" "}
                    ${item.alamatSPBU.propinsi}`,
                      65
                    )}
                  </TableCell>
                  <TableCell>
                    <ChipUser uid={item.admin} spbu={item} listUser={listUser} loading={loading} />
                  </TableCell>
                  <TableCell>
                    <Button href={`${item.spbuUID}`}>Lihat</Button>
                    <Button>Update</Button>
                    <Button>Delete</Button>
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan="5">Loading....</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Paper>
  );
}
