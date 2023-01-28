import React from "react";
import { useSelector } from "react-redux";
import FormTransaksi from "../../../features/pages/SPBU/FormTransaksi/FormTransaksi";
import FormProduk from "../../../features/pages/SPBU/DetailSPBU/components/FormProduk/FormProduk";
import FormHargaProduk from "../../../features/pages/SPBU/DetailSPBU/components/FormProduk/FormHargaProduk";
import Pesan from "../../../features/pages/SPBU/DetailSPBU/components/Pesan/Pesan";
import FormTambahAdminSpbu from "../../../features/pages/SPBU/TabelSPBU/ChipUser/FormTambahAdminSpbu";

export default function DialogManager() {
  const dialogLookup = {
    FormTransaksi,
    FormProduk,
    FormHargaProduk,
    Pesan,
    FormTambahAdminSpbu,
    //   FormGerai,
    //   ConfirmDialog,
    //   DialogHarga,
    //   UserForm,
    //   DialogTambahProduk,
    //   DialogTransaksi,
    //   DialogSetUserGerai,
    //   DialogSetAdmin,
    //   DialogInvoice,
  };
  const currentDialog = useSelector((state) => state.dialogs);
  let renderedDialog;
  if (currentDialog) {
    const { dialogType, dialogProps, dialogData } = currentDialog;
    const DialogComponent = dialogLookup[dialogType];
    renderedDialog = <DialogComponent {...dialogProps} {...dialogData} />;
  }
  return <span>{renderedDialog}</span>;
}
