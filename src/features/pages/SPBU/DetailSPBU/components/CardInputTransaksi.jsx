import React from "react";
import { Box, Paper, Button } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useDispatch } from "react-redux";
import { openDialog } from "../../../../../apps/store/reducers/dialogReducer";

export default function CardInputTransaksi({detailSPBU, hargaProduk}) {
  const dispatch = useDispatch();
  return (
    <Grid xs={12}>
      <Paper sx={{ marginBottom: "10px", padding: "16px" }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <h2>Input Transaksi SPBU</h2>
          </Box>
          <Box>
            <Button
              variant="contained"
              onClick={() =>
                dispatch(
                  openDialog({
                    dialogType: "FormTransaksi",
                    dialogData: {
                        spbu: detailSPBU,
                        allProduk: detailSPBU.produkSPBU,
                        hargaProduk: hargaProduk,
                    },
                  })
                )
              }
            >
              Upload
            </Button>
          </Box>
        </Box>
      </Paper>
    </Grid>
  );
}
