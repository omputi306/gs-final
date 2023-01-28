import React from "react";
import { Box, Paper, Button } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import GrafikSpbu from "./components/GrafikSPBU/GrafikSpbu";
import InsightCard from "./components/InsightCard/InsightCard";
import ProfileSPBUCard from "./components/ProfileSPBUCard";
import CardInputTransaksi from "./components/CardInputTransaksi";
import TabelInvoice from "./components/Tabel-Invoice/TabelInvoice";
import useFirestoreDoc from "../../../../apps/hooks/useFirestoreDoc";
import {
  getAllPesanFromFirestore,
  getHargaProdukFromFirestore,
  getSelectedSpbuFromFirestore,
  getSelectedSpbuInvoicesFromFirestore,
} from "../../../../apps/services/firestoreServices";
import { useDispatch, useSelector } from "react-redux";
// import { listenToSelectedSPBU } from "../../../../apps/store/actions/listSpbuAction";
import { useParams } from "react-router-dom";
import { listenToSelectedSPBU } from "../../../../apps/store/actions/selectedSpbu";
import { listenToSelectedHargaSPBU } from "../../../../apps/store/actions/hargaAction";
import useFirestoreCollection from "../../../../apps/hooks/useFirestoreCollection";
import { listenToSelectedInvoicesSPBU } from "../../../../apps/store/actions/invoiceAction";
import { listenToAllPesanSPBU } from "../../../../apps/store/actions/pesanPendekAction";

export default function DetailSpbu() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { detailSPBU, hargaProduk, invoiceTransaksi, dataPesanPendek } = useSelector(
    (state) => state.selectedSPBU
  );
  const { loading } = useSelector((state) => state.async);

  console.log(id);
  useFirestoreDoc({
    query: () => getSelectedSpbuFromFirestore(id),
    data: (spbu) => dispatch(listenToSelectedSPBU(spbu)),
    deps: [dispatch, id],
  });

  useFirestoreCollection({
    query: () => getHargaProdukFromFirestore(id),
    data: (spbu) => dispatch(listenToSelectedHargaSPBU(spbu)),
    deps: [dispatch, id],
  });

  useFirestoreCollection({
    query: () => getSelectedSpbuInvoicesFromFirestore(id),
    data: (invoices) => dispatch(listenToSelectedInvoicesSPBU(invoices)),
    deps: [dispatch, id],
  });

  useFirestoreCollection({
    query: () => getAllPesanFromFirestore(id),
    data: (pesan) => dispatch(listenToAllPesanSPBU(pesan)),
    deps: [dispatch, id],
  });

  function createTableData(data) {
    const newData = [];

    // pertama
    const spbuUID = data
      ?.map(({ spbuUID }) => spbuUID)
      .filter((v, i, a) => a.indexOf(v) === i);

    const namaSPBU = data
      ?.map(({ namaSPBU }) => namaSPBU)
      .filter((v, i, a) => a.indexOf(v) === i);

    // Kedua
    const nomorInvoice = data
      ?.map(({ nomorInvoice }) => nomorInvoice)
      .filter((v, i, a) => a.indexOf(v) === i);

    for (let i = 0; i < spbuUID?.length; i++) {
      for (let i = 0; i < namaSPBU?.length; i++) {
        const _spbuUID = spbuUID[i];
        const _namaSPBU = namaSPBU[i];
        const objectData = {
          spbuUID: _spbuUID,
          namaSPBU: _namaSPBU,
          invoices: {
            reguler: [],
            industri: [],
            pembelian: [],
          },
        };
        for (let i = 0; i < nomorInvoice?.length; i++) {
          const _nomorInvoice = nomorInvoice[i];
          const invoiceReguler = [];
          const invoiceIndustri = [];
          const invoicePembelian = [];
          for (let i = 0; i < data?.length; i++) {
            if (data[i].nomorInvoice === _nomorInvoice) {
              if (data[i].spbuUID === _spbuUID) {
                if (data[i].kategoriPenjualan === "Reguler") {
                  const invoices = {
                    nomorInvoice: _nomorInvoice,
                    tanggal: data[i].tanggalInvoice,
                    fileInvoice: data[i].fileInvoice,
                  };
                  data[i].produks?.forEach((element) => {
                    invoiceReguler.push({
                      ...element,
                      total: element.hargaperliter * element.jumlahLiter,
                    });
                    invoices["item"] = invoiceReguler;
                  });
                  objectData.invoices.reguler.push(invoices);
                }
                if (data[i].kategoriPenjualan === "Industri") {
                  const invoices = {
                    nomorInvoice: _nomorInvoice,
                    tanggal: data[i].tanggalInvoice,
                    fileInvoice: data[i].fileInvoice,
                  };
                  data[i].produks.forEach((element) => {
                    invoiceIndustri.push({
                      ...element,
                      total: element.hargaperliter * element.jumlahLiter,
                    });
                    invoices["item"] = invoiceIndustri;
                  });
                  objectData.invoices.industri.push(invoices);
                }
                if (data[i].jenisTransaksi === "Pembelian") {
                  const invoices = {
                    nomorInvoice: _nomorInvoice,
                    tanggal: data[i].creationDate,
                    fileInvoice: data[i].fileInvoice,
                  };
                  data[i].produks.forEach((element) => {
                    invoicePembelian.push(element);
                    invoices["item"] = invoicePembelian;
                  });
                  objectData.invoices.pembelian.push(invoices);
                }
              }
            }
          }
        }
        // newData.push(objectData);
        return objectData
      }
      // return newData;
    }
  }

  return (
    <section>
      <div className="main">
        <h1>Detail Gerai</h1>
        <Box paddingTop=".8rem" sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid xs={3}>
              <ProfileSPBUCard
                idSPBU={id}
                data={detailSPBU}
                loading={loading}
              />
            </Grid>
            <Grid xs={9}>
              <Grid container padding="0px">
                <CardInputTransaksi
                  hargaProduk={hargaProduk}
                  detailSPBU={detailSPBU}
                />
                <InsightCard idSPBU={id} data={detailSPBU} loading={loading} />
                <GrafikSpbu id={id} pesanPendek={dataPesanPendek} loading={loading} />
                <TabelInvoice
                  data={createTableData(invoiceTransaksi)}
                  loading={loading}
                />
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </div>
    </section>
    // <>

    //   <GrafikSpbu />
    // </>
  );
}
