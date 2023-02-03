import { Box, Button, TextField } from "@mui/material";
import { Formik, Form, FieldArray } from "formik";
import React, { useState } from "react";
import * as yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExclamationTriangle,
  faTrashCan
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";
import InputField from "../../../../apps/common/Forms/InputField";
import SelectInputField from "../../../../apps/common/Forms/SelectInputField";
import {
  addInvoiceToFirestore,
  uploadFileInvoiceToFirestore
} from "../../../../apps/services/firestoreServices";
import { closeDialog } from "../../../../apps/store/reducers/dialogReducer";
import { useDispatch } from "react-redux";

export default function FormPembelian({ jenisTransaksi, dialogData, loading }) {
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const [tanggalPenyerahan, setTanggalPenyerahan] = useState(moment());
  const [tanggalInvoice, setTanggalInvoice] = useState(moment());

  const addFields = ({ values, setValues }) => {
    const produks = [...values.produks];
    produks.push({
      kodeProduk: "",
      jenisProduk: "",
      jumlahRtl: "",
      jumlahLiter: 0
    });
    setValues({ ...values, produks });
  };

  const removeField = ({ values, setValues, index, resetForm }) => {
    const produks = [...values.produks];
    produks.splice(index, 1);
    resetForm();
    setValues({ ...values, produks });
  };

  const initialValues = {
    spbuUID: dialogData?.spbu?.spbuUID,
    namaSPBU: dialogData?.spbu?.namaSPBU,
    nomorInvoice: "",
    totalHarga: "",
    fileInvoice: "",
    jenisTransaksi: jenisTransaksi,
    tanggalRencanaPenyerahan: "",
    tanggalInvoice: "",
    terimaBarang: false,
    produks: []
  };

  const schema = yup.object().shape({
    spbuUID: yup.string().required("ID SPBU produk tidak boleh kosong"),
    namaSPBU: yup.string().required("Nama SPBU produk tidak boleh kosong"),
    nomorInvoice: yup.string().required("Nomor Invoice tidak boleh kosong"),
    totalHarga: yup.string().required("Total harga tidak boleh kosong"),
    jenisTransaksi: yup.string().required("Jenis transaksi tidak boleh kosong"),
    fileInvoice: yup
      .string()
      .required(
        "File invoice tidak boleh kosong (Hanya mendukung file PDF/JPG/JPEG/PNG)"
      ),
    tanggalRencanaPenyerahan: yup
      .string()
      .required("Tanggal rencana penyerahan tidak boleh kosong"),
    tanggalInvoice: yup
      .string()
      .required("Tanggal rencana penyerahan tidak boleh kosong"),
    produks: yup
      .array()
      .of(
        yup.object().shape({
          kodeProduk: yup.string().required("Kode produk tidak boleh kosong"),
          jenisProduk: yup.string().required("Jenis produk tidak boleh kosong"),
          jumlahRtl: yup.string().required("Jumlah RTL tidak boleh kosong"),
          jumlahLiter: yup.string().required("Jumlah liter tidak boleh kosong")
        })
      )
      .min(1, "Produk produk yang dibeli (Kolom ini tidak boleh kosong)")
      .required()
  });
  // if (loading) return <>Loading...</>
  return (
    <Box>
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={async (values, { setSubmitting, setErrors, resetForm }) => {
          try {
            await uploadFileInvoiceToFirestore({ file, values });
            setSubmitting(false);
            toast.success(
              `Upload invoice ${values.jenisTransaksi} ${values.nomorInvoice} Berhasil`
            );
            dispatch(closeDialog());
            resetForm();
          } catch (error) {
            setErrors({ upload: "Gangguan Sistem" });
            toast.error(error);
          }
          // return addBatchTransaksiToFirestore({ file, values });
          console.log("forms", values);
        }}
      >
        {({
          isSubmitting,
          dirty,
          isValid,
          values,
          setValues,
          setFieldValue,
          resetForm,
          setErrors,
          setSubmitting,
          errors
        }) => (
          <Form>
            <InputField name="spbuUID" label="ID SPBU" disabled />
            <InputField name="namaSPBU" label="Nama SPBU" disabled />
            <InputField name="nomorInvoice" label="Nomor Invoice" />
            <InputField
              name="totalHarga"
              label="Total Harga"
              type="number"
              inputProps={{ min: 0 }}
            />
            <Box mb={1.5}>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DesktopDatePicker
                  label="Tanggal Invoice"
                  inputFormat="DD/MMM/YYYY"
                  // minDate={new Date()}
                  name="tanggalInvoice"
                  value={tanggalInvoice}
                  onChange={(e) => {
                    setTanggalInvoice(e);
                    setFieldValue("tanggalInvoice", e.toDate());
                    console.log(e.toDate());
                  }}
                  renderInput={(params) => (
                    <TextField fullWidth size="small" {...params} />
                  )}
                />
              </LocalizationProvider>
            </Box>
            <Box mb={1.5}>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DesktopDatePicker
                  label="Tanggal Rencana Penyerahan"
                  inputFormat="DD/MMM/YYYY"
                  // minDate={new Date()}
                  name="tanggalRencanaPenyerahan"
                  value={tanggalPenyerahan}
                  onChange={(e) => {
                    setTanggalPenyerahan(e);
                    setFieldValue("tanggalRencanaPenyerahan", e.toDate());
                    console.log(e.toDate());
                  }}
                  renderInput={(params) => (
                    <TextField fullWidth size="small" {...params} />
                  )}
                />
              </LocalizationProvider>
            </Box>
            <InputField
              type="file"
              name="fileInvoice"
              inputProps={{
                accept: "application/pdf, image/jpg, image/jpeg, image/png"
              }}
              onChange={(e) => {
                setFile(e.target.files[0]);
                setFieldValue("fileInvoice", e.target.value);
              }}
            />
            <Box>
              <h2>Detail Produk</h2>
              {values.produks.length < 1 && errors.produks ? (
                <span style={{ fontSize: "14px", color: "red" }}>
                  <FontAwesomeIcon icon={faExclamationTriangle} />{" "}
                  {errors.produks}
                </span>
              ) : null}
            </Box>
            <FieldArray>
              {() =>
                values.produks?.map((produk, index) => {
                  return (
                    <Box key={index} display="flex" gap="20px">
                      <SelectInputField
                        name={`produks.${index}.kodeProduk`}
                        placeholder="Pilih Kode Produk"
                        label="Kode Produk"
                        options={
                          dialogData?.allProduk
                            ? dialogData.allProduk?.map((item, index) => {
                                return {
                                  key: index,
                                  value: item.kodeProduk,
                                  label: `${item.kodeProduk}`
                                };
                              })
                            : null
                        }
                        onChange={(e) => {
                          setFieldValue(
                            `produks.${index}.kodeProduk`,
                            e.target.value
                          );
                          setFieldValue(
                            `produks.${index}.jenisProduk`,
                            dialogData.allProduk?.find(
                              (x) => x.kodeProduk === e.target.value
                            ).namaProduk
                          );
                        }}
                      />
                      <InputField
                        name={`produks.${index}.jenisProduk`}
                        placeholder="Jenis Produk"
                        label="Jenis Produk"
                        disabled
                      />
                      <InputField
                        name={`produks.${index}.jumlahRtl`}
                        placeholder="Masukan Jumlah RTL"
                        label="Jumlah RTL"
                        type="number"
                        inputProps={{ min: 0 }}
                      />
                      <InputField
                        name={`produks.${index}.jumlahLiter`}
                        placeholder="Masukan Jumlah Liter"
                        label="Jumlah Liter"
                        type="number"
                        inputProps={{ min: 0 }}
                      />
                      <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Button
                          onClick={() =>
                            removeField({ values, setValues, index, resetForm })
                          }
                        >
                          <FontAwesomeIcon
                            style={{ fontSize: "14px", color: "red" }}
                            icon={faTrashCan}
                          />
                        </Button>
                      </Box>
                    </Box>
                  );
                })
              }
            </FieldArray>

            <Box display="flex" justifyContent="space-between">
              <Box>
                <Button onClick={() => addFields({ values, setValues })}>
                  Tambah Produk
                </Button>
              </Box>
              <Box display="flex" gap="10px">
                <Button
                  variant="contained"
                  color="warning"
                  onClick={() => resetForm()}
                  disabled={!dirty || isSubmitting}
                >
                  Reset
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={!isValid || !dirty || isSubmitting}
                >
                  Submit
                </Button>
              </Box>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
}
