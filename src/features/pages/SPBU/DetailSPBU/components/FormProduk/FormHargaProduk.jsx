import React from "react";
import {
  Box,
  DialogTitle,
  DialogContent,
  Button,
  IconButton,
  DialogActions,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DialogWrapper from "../../../../../../apps/common/Dialog/DialogWrapper";
import InputField from "../../../../../../apps/common/Forms/InputField";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Formik, Form, FieldArray } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { closeDialog } from "../../../../../../apps/store/reducers/dialogReducer";
import SelectInputField from "../../../../../../apps/common/Forms/SelectInputField";
import { addHargaProdukToFirestore } from "../../../../../../apps/services/firestoreServices";
import { toast } from "react-toastify";

export default function FormHargaProduk() {
  const dispatch = useDispatch();
  const { dialogData } = useSelector((state) => state.dialogs);
  const { loading } = useSelector((state) => state.async);

  console.log("Harga =>", dialogData?.allProduk);

  const initialValues = !dialogData.hargaProduk
    ? {
        spbuUID: dialogData.idSPBU,
        harga: [],
      }
    : {
        spbuUID: dialogData.idSPBU,
        harga: dialogData?.hargaProduk,
      };

  const validationSchema = yup.object().shape({
    harga: yup
      .array()
      .of(
        yup.object().shape({
          namaProduk: yup.string().required("Nama produk tidak boleh kosong"),
          kategoriHarga: yup
            .string()
            .required("Kategori harga tidak boleh kosong"),
          hargaProduk: yup.string().required("Harga produk tidak boleh kosong"),
        })
      )
      .min(1, "Harga Tidak Boleh Kosong")
      .required(),
  });

  const addFields = ({ values, setValues }) => {
    const harga = [...values.harga];
    harga.push({
      namaProduk: "",
      kategoriHarga: "",
      hargaProduk: "",
    });
    setValues({ ...values, harga });
  };

  const removeField = ({ values, setValues, index, resetForm }) => {
    const harga = [...values.harga];
    harga.splice(index, 1);
    resetForm();
    setValues({ ...values, harga });
  };

  return (
    <DialogWrapper>
      <Formik
        initialValues={initialValues}
        // validationSchema={validationSchema}
        onSubmit={async (values) => {
          try {
            await addHargaProdukToFirestore(values);
            toast.success("Harga berhasil diupdate");
            dispatch(closeDialog());
          } catch (error) {
            toast.error(error);
          }
          // console.log(values);
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
        }) => (
          <Form>
            <DialogTitle>
              Produk SPBU
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
              <Box mb="10px" mt="10px">
                <Button
                  variant="contained"
                  onClick={() => addFields({ values, setValues })}
                >
                  Tambah Produk
                </Button>
              </Box>
              <FieldArray>
                {() =>
                  values.harga?.map((item, index) => {
                    return (
                      <Box
                        display="flex"
                        gap="10px"
                        justifyContent="center"
                        alignItems="center"
                        key={index}
                      >
                        <Box flex="1">
                          <SelectInputField
                            name={`harga.${index}.namaProduk`}
                            options={dialogData?.allProduk?.map(
                              (item, index) => {
                                return {
                                  key: index,
                                  value: item.namaProduk,
                                  label: item.namaProduk,
                                };
                              }
                            )}
                          />
                        </Box>
                        <Box flex="1">
                          <SelectInputField
                            name={`harga.${index}.kategoriHarga`}
                            placeholder="Pilih Kategori Produk"
                            label="Kategori Produk"
                            options={[
                              {
                                key: "",
                                value: "",
                                label: <em>Pilih Kategori Produk</em>,
                              },
                              {
                                key: "reguler",
                                value: "Reguler",
                                label: "Reguler",
                              },
                              {
                                key: "industri",
                                value: "Industri",
                                label: "Industri",
                              },
                            ]}
                          />
                        </Box>
                        <Box flex="1">
                          <InputField
                            type="number"
                            inputProps={{ min: 0 }}
                            name={`harga.${index}.hargaProduk`}
                            label="Harga Produk"
                            placeholder="Masukan Harga Produk"
                          />
                        </Box>
                        <Box>
                          <IconButton
                            onClick={() =>
                              removeField({
                                values,
                                setValues,
                                index,
                                resetForm,
                              })
                            }
                          >
                            <FontAwesomeIcon
                              style={{ fontSize: "14px", color: "red" }}
                              icon={faTrashCan}
                            />
                          </IconButton>
                        </Box>
                      </Box>
                    );
                  })
                }
              </FieldArray>
            </DialogContent>
            <DialogActions>
              <Button
                variant="contained"
                color="warning"
                onClick={() => resetForm()}
              >
                Reset
              </Button>
              <Button type="submit" variant="contained">
                Upload Harga Produk
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </DialogWrapper>
  );
}
