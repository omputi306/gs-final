import React, { useState } from "react";
import {
  Box,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import FormPembelian from "./FormPembelian";
import FormPenjualan from "./FormPenjualan";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import DialogWrapper from "../../../../apps/common/Dialog/DialogWrapper";
import { closeDialog } from "../../../../apps/store/reducers/dialogReducer";

export default function FormTransaksi() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.async);
  const { dialogData } = useSelector((state) => state.dialogs);
  const [formJenisTransaksi, setFormJenisTransaksi] = useState(
    "Pilih Jenis Transaksi"
  );
  console.log("dialog data =>", dialogData)
  return (
    <DialogWrapper fullScreen>
      <DialogTitle>
        Input Transaksi SPBU
        <IconButton
          aria-label="close"
          onClick={() => dispatch(closeDialog())}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box mb={2.5}>
          <FormControl
          // fullWidth
          >
            {/* <InputLabel>Jenis Transaksi</InputLabel> */}
            <Select
              size="small"
              defaultValue={formJenisTransaksi}
              value={formJenisTransaksi}
              onChange={(e) => setFormJenisTransaksi(e.target.value)}
            >
              <MenuItem value="Pilih Jenis Transaksi">
                <em>Pilih Jenis Transaksi</em>
              </MenuItem>
              {["Penjualan", "Pembelian"].map((value) => (
                <MenuItem key={value} value={value}>
                  {value}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        {formJenisTransaksi !== "Pilih Jenis Transaksi" ? (
          formJenisTransaksi === "Pembelian" ? (
            <FormPembelian
              loading={loading}
              jenisTransaksi={formJenisTransaksi}
              dialogData={dialogData}
              // spbu={currentUserAdminProfile.spbu}
            />
          ) : (
            <FormPenjualan
              loading={loading}
              jenisTransaksi={formJenisTransaksi}
              dialogData={dialogData}
              // spbu={currentUserAdminProfile.spbu}
            />
          )
        ) : (
          <span style={{ color: "red", fontSize: "14px" }}>
            <FontAwesomeIcon icon={faExclamationTriangle} /> Pilih jenis
            transaksi untuk melanjutkan...
          </span>
        )}
      </DialogContent>
    </DialogWrapper>
  );
}
