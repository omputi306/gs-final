import { Paper, Table, TableBody, TableCell, TableHead } from '@mui/material'
import React from 'react'

export default function TabelUser() {
  return (
    <Paper>
        <Table>
            <TableHead>
                <TableCell>No.</TableCell>
                <TableCell>USER ID</TableCell>
                <TableCell>NAMA USER</TableCell>
                <TableCell>EMAIL</TableCell>
                <TableCell>ACTION</TableCell>
            </TableHead>
            <TableBody>
                
            </TableBody>
        </Table>
    </Paper>
  )
}
