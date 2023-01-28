import React, { useState } from "react";
import moment from "moment";
import { Formik, Form, FieldArray } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import { Box } from "@mui/system";
import InputField from "../../../../apps/common/Forms/InputField";
import SelectInputField from "../../../../apps/common/Forms/SelectInputField";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExclamationTriangle,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { Button, TextField } from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import NumericInput from "../../../../apps/common/Forms/NumericInput";
import { uploadFileInvoiceToFirestore } from "../../../../apps/services/firestoreServices";
// import { closeDialog } from "../../../../../../gunung-selatan-summary-master/src/apps/store/reducers/dialogReducer";
import {useDispatch} from "react-redux"
import { closeDialog } from "../../../../apps/store/reducers/dialogReducer";

export default function FormPenjualan({ jenisTransaksi, loding, dialogData }) {
  const [file, setFile] = useState(null);
  const [tanggalInvoice, setTanggalInvoice] = useState(moment());
  const [kategoriPenjualan, setKategoriPenjualan] = useState("");
  const dispatch = useDispatch

  function hargaUpdate(data) {
    const hargaUpdate = data?.map((item) => item.harga);
    for (let i = 0; i < hargaUpdate[0]?.length; i++) {
      const hargaObj = hargaUpdate[i];
      return hargaObj;
    }
  }

  console.log("Penjualan =>", hargaUpdate(dialogData.hargaProduk));

  const addFields = ({ values, setValues }) => {
    const produks = [...values.produks];
    produks.push({
      kodeProduk: "",
      namaProduk: "",
      hargaperliter: "",
      jumlahRtl: "",
      jumlahLiter: "",
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
    spbuUID: dialogData?.spbu.spbuUID,
    namaSPBU: dialogData?.spbu.namaSPBU,
    nomorInvoice: "",
    totalHarga: "",
    fileInvoice: "",
    kategoriPenjualan: "",
    jenisTransaksi: jenisTransaksi,
    tanggalInvoice: "",
    produks: [],
  };

  const schema = yup.object().shape({
    spbuUID: yup.string().required("ID SPBU produk tidak boleh kosong"),
    namaSPBU: yup.string().required("Nama SPBU produk tidak boleh kosong"),
    nomorInvoice: yup.string().required("Nomor Invoice tidak boleh kosong"),
    totalHarga: yup.string().required("Total harga tidak boleh kosong"),

    kategoriPenjualan: yup
      .string()
      .required("Kategori transaksi tidak boleh kosong"),
    jenisTransaksi: yup.string().required("Jenis transaksi tidak boleh kosong"),
    fileInvoice: yup
      .string()
      .required(
        "File invoice tidak boleh kosong (Hanya mendukung file PDF/JPG/JPEG/PNG)"
      ),
    tanggalInvoice: yup.string().required("Tanggal invoice tidak boleh kosong"),
    produks: yup
      .array()
      .of(
        yup.object().shape({
          kodeProduk: yup.string().required("Kode produk tidak boleh kosong"),
          namaProduk: yup.string().required("Jenis produk tidak boleh kosong"),
          hargaperliter: yup
            .string()
            .required("Harga /Liter tidak boleh kosong"),
          jumlahRtl: yup.string().required("Jumlah RTL tidak boleh kosong"),
          jumlahLiter: yup.string().required("Jumlah liter tidak boleh kosong"),
        })
      )
      .min(1, "Produk produk yang dibeli (Kolom ini tidak boleh kosong)")
      .required(),
  });
  return (
    <Box>
      <Formik
        initialValues={initialValues}
        // validationSchema={schema}
        onSubmit={async (
          values,
          { setSubmitting, setErrors, resetForm, errors }
        ) => {
          try {
            await uploadFileInvoiceToFirestore({ file, values });
            setSubmitting(false);
            toast.success(
              `Upload invoice ${values.jenisTransaksi} ${values.nomorInvoice} Berhasil`
            );
            dispatch(closeDialog())
            resetForm();
          } catch (error) {
            setErrors({ upload: "Gangguan Sistem" });
            toast.error(errors);
          }
          console.log("forms", values);
          // console.log(errors);
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
          errors,
        }) => (
          <Form>
            <InputField name="spbuUID" label="ID SPBU" disabled />
            <InputField name="namaSPBU" label="Nama SPBU" disabled />
            <InputField name="nomorInvoice" label="Nomor Invoice" />
            <SelectInputField
              name="kategoriPenjualan"
              placeholder="Pilih Kategori Penjualan"
              label="Karegori Penjualan"
              options={[
                {
                  key: "",
                  value: "",
                  label: <em>Pilih Kategori Penjualan</em>,
                },
                { key: "reguler", value: "Reguler", label: "Reguler" },
                { key: "industri", value: "Industri", label: "Industri" },
              ]}
            />
            <InputField
              name="totalHarga"
              label="Total Harga"
              type="number"
              inputProps={{ min: 0 }}
            />
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DesktopDatePicker
                label="Tanggal Invoice"
                inputFormat="MM/DD/YYYY"
                // placeholder="MM/DD/YYYY"
                minDate={new Date()}
                name="tanggalInvoice"
                value={tanggalInvoice}
                onChange={(e) => {
                  setTanggalInvoice(e);
                  setFieldValue("tanggalInvoice", e.toDate());
                  // console.log(e.toDate());
                }}
                renderInput={(params) => (
                  <TextField fullWidth size="small" {...params} />
                )}
              />
            </LocalizationProvider>
            <InputField
              type="file"
              name="fileInvoice"
              inputProps={{
                accept: "application/pdf, image/jpg, image/jpeg, image/png",
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
                        placeholder="Pilih Jenis Produk"
                        label="Jenis Produk"
                        options={hargaUpdate(dialogData?.hargaProduk).map(
                          (item, index) => {
                            return {
                              key: index,
                              value: item.kodeProduk,
                              label: `${item.namaProduk} - ${item.kategoriHarga}`,
                            };
                          }
                        )}
                        onChange={(e) => {
                          setFieldValue(
                            `produks.${index}.kodeProduk`,
                            e.target.value
                          );
                          setFieldValue(
                            `produks.${index}.hargaperliter`,
                            hargaUpdate(dialogData?.hargaProduk).find(
                              (x) => x.kodeProduk === e.target.value
                            ).hargaProduk
                          );
                          setFieldValue(
                            `produks.${index}.namaProduk`,
                            hargaUpdate(dialogData?.hargaProduk).find(
                              (x) => x.kodeProduk === e.target.value
                            ).namaProduk
                          );
                          // console.log(e.target.value)
                        }}
                      />
                      <InputField
                        name={`produks.${index}.namaProduk`}
                        placeholder="Nama Produk"
                        label="Nama Produk"
                        disabled
                      />
                      <NumericInput
                        name={`produks.${index}.hargaperliter`}
                        placeholder="Masukan Harga /Liter"
                        label="Harga /Liter"
                        thousandSeparator=","
                        disabled
                      />
                      <InputField
                        name={`produks.${index}.jumlahLiter`}
                        placeholder="Masukan Jumlah Liter"
                        label="Jumlah Liter"
                        type="number"
                        inputProps={{ min: 0 }}
                      />
                      <InputField
                        name={`produks.${index}.jumlahRtl`}
                        placeholder="Masukan Jumlah RTL"
                        label="Jumlah RTL"
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
