import React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import Card from "./Card";


export default function InsightCard({ dataTransaksi, data, loading }) {
  return (
    <>
      {!loading ? (
        data?.produkSPBU?.length > 0 ? (
          data?.produkSPBU?.map((item, index) => {
            return (
              <Grid xs={4} key={index}>
                <Card
                  dataTransaksi={dataTransaksi}
                  icon={item?.icon}
                  produk={item?.namaProduk}
                  tangki={item.kapasitasTangki}
                />
              </Grid>
            );
          })
        ) : (
          <>Belum Ada Produk</>
        )
      ) : (
        <>Loading...</>
      )}
    </>
  );
}
