import React from "react";
import { Box, Chip, Paper } from "@mui/material";
import { CircularProgressbar } from "react-circular-progressbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGasPump } from "@fortawesome/free-solid-svg-icons";

export default function Card({ dataTransaksi, produk, tangki }) {
  console.log("insight Card", produk, tangki);
  const penjualan = dataTransaksi
    ?.filter((e) => e.jenisTransaksi === "Penjualan")
    .map((data) => data.produks?.filter((item) => item.namaProduk === produk));

  const pembelian = dataTransaksi
    ?.filter((e) => e.jenisTransaksi === "Pembelian")
    .map((data) => data.produks?.filter((item) => item.jenisProduk === produk));

  const totalLiterTerjual = penjualan?.reduce(
    (totL, item) => totL + item[0]?.jumlahLiter,
    0
  );

  const totalLiterDibeli = pembelian?.reduce(
    (totL, item) => totL + item[0]?.jumlahLiter,
    0
  );
  // const totalLiterDibeli = pembelian?.reduce((totL, item) =>
  //   item[0]?.lenght > 0 ? (totL + item[0]?.jumlahLiter, 0) : null
  // );

  console.log(totalLiterDibeli);

  console.log(produk, "==>", totalLiterTerjual);
  console.log("Pembelian =>", produk, "=>", totalLiterDibeli);
  console.log(
    "sisa stok =>",
    ((totalLiterDibeli - totalLiterTerjual) / tangki) * 100
  );
  console.log(
    "chart",
    "==>",
    (
      ((totalLiterDibeli - totalLiterTerjual) / tangki) * 100 -
      (totalLiterTerjual / tangki) * 100
    ).toFixed(0)
  );
  return (
    <Paper sx={{ padding: "10px" }}>
      <Box display="flex">
        <Box flex="1">
          <Box>
            <FontAwesomeIcon
              icon={faGasPump}
              style={{
                background: "red",
                padding: 8,
                height: 20,
                width: 20,
                borderRadius: "50%"
              }}
            />
          </Box>
          <Box>
            <h2>{produk}</h2>
          </Box>
          <Box>
            {/* <h3>Terjual {totalLiterTerjual} Liter</h3> */}
            <h3>Sisa Stok {totalLiterDibeli - totalLiterTerjual} Liter</h3>
            <Chip
              label={
                <h3>
                  Refill {tangki - (totalLiterDibeli - totalLiterTerjual)} Liter
                </h3>
              }
              variant="outlined"
              color="warning"
              size="small"
            />
          </Box>
          <Box>
            <small>Last 24 hours</small>
          </Box>
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <CircularProgressbar
            className="progress-bar"
            value={((totalLiterDibeli - totalLiterTerjual) / tangki) * 100}
            text={`${(
              ((totalLiterDibeli - totalLiterTerjual) / tangki) *
              100
            ).toFixed(0)}%`}
          />
        </Box>
      </Box>
    </Paper>
  );
}
