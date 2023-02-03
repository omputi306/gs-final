import React from "react";
// import { dataCardGerai } from "../../../../../../apps/common/Template-Data/Template_Data";
import Grid from "@mui/material/Unstable_Grid2";
import Card from "./Card";
import { dataCardGerai } from "../../../../../../apps/common/Template-Data/Template_Data";
import { useDispatch, useSelector } from "react-redux";
import useFirestoreCollection from "../../../../../../apps/hooks/useFirestoreCollection";
import { getProdukSpbuFromFirestore } from "../../../../../../apps/services/firestoreServices";
import { listenToAllProduk } from "../../../../../../apps/store/actions/produkActions";
import useFirestoreDoc from "../../../../../../apps/hooks/useFirestoreDoc";

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
