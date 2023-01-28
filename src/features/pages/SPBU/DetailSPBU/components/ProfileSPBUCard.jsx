import React from "react";
import { Paper, Box, Avatar, Button } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import { useDispatch } from "react-redux";
import { openDialog } from "../../../../../apps/store/reducers/dialogReducer";

export default function ProfileSPBUCard({ idSPBU, hargaProduk, data, loading }) {
  const dispatch = useDispatch();
  if (loading) return <Paper>Loading...</Paper>;
  return (
    <Paper sx={{ marginBottom: "10px" }}>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Box
          sx={{
            color: "white",
            background: "#7d8da1",
            height: "130px",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            // justifyContent: "center",
            alignItems: "center",
            paddingTop: "16px",
            marginBottom: "20px",
            borderTopLeftRadius: "5px",
            borderTopRightRadius: "5px",
          }}
        >
          <h2>{data?.namaSPBU}</h2>
          <h3>{data?.spbuUID}</h3>
        </Box>
        <Box marginBottom="20px" marginTop="-70px">
          <Avatar
            alt="Avatar SPBU"
            src={`avatar`}
            sx={{ width: 100, height: 100 }}
          />
        </Box>
        <Box
          marginBottom="20px"
          display="flex"
          // flexDirection="column"
          justifyContent="center"
          alignItems="center"
          padding="10px"
        >
          <span>
            {data?.alamatSPBU.alamat} RT{data?.alamatSPBU.rt}/RW
            {data?.alamatSPBU.rw} {data?.alamatSPBU.kelurahan}{" "}
            {data?.alamatSPBU.kecamatan} {data?.alamatSPBU.kabupaten},{" "}
            {data?.alamatSPBU.propinsi}
          </span>
        </Box>
        <Box marginBottom="20px">
          <Box display="flex" gap="10px">
            <LocalPhoneIcon />
            <span>Nomor TLPS</span>
          </Box>
          <Box display="flex" gap="10px">
            <EmailIcon />
            <span>@email</span>
          </Box>
        </Box>
        <Box
          //   display="flex"
          //   alignItems="space-between"
          justifyContent="center"
          width="100%"
          marginBottom="20px"
          padding="10px"
        >
          <Box display="flex" flexDirection="column" gap={1}>
            <Button
              fullWidth
              variant="contained"
              onClick={() =>
                dispatch(
                  openDialog({
                    dialogType: "FormProduk",
                    dialogData: {
                      idSPBU: idSPBU,
                      allProduk: data?.produkSPBU,
                      hargaProduk: hargaProduk
                    },
                  })
                )
              }
            >
              {!loading
                ? data?.produkSPBU?.length > 0
                  ? "Update Produk"
                  : "Tambah Produk"
                : null}
            </Button>
            {!loading ? (
              data?.produkSPBU?.length > 0 ? (
                <>
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={() =>
                      dispatch(
                        openDialog({
                          dialogType: "FormHargaProduk",
                          dialogData: {
                            idSPBU: idSPBU,
                            allProduk: data?.produkSPBU,
                            hargaProduk: hargaProduk
                          },
                        })
                      )
                    }
                  >
                    Update Harga Produk
                  </Button>
                </>
              ) : null
            ) : null}
            <Button variant="outlined" onClick={() => dispatch(openDialog({
              dialogType: "Pesan",
              dialogData: {}
            }))}>Pesan</Button>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
}
