import React from "react";
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { FieldArray, Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import DialogWrapper from "../../../../../../apps/common/Dialog/DialogWrapper";
import { closeDialog } from "../../../../../../apps/store/reducers/dialogReducer";
import * as yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import InputField from "../../../../../../apps/common/Forms/InputField";
import SelectInputField from "../../../../../../apps/common/Forms/SelectInputField";
import { toast } from "react-toastify";
import { updateProdukSbpu } from "../../../../../../apps/services/firestoreServices";

export default function FormProduk() {
  const dispatch = useDispatch();
  const { dialogData } = useSelector((state) => state.dialogs);
  const { loading } = useSelector((state) => state.async);

  console.log("Produk =>", dialogData?.allProduk);

  const initialValues = !dialogData.allProduk
    ? {
        spbuUID: dialogData.idSPBU,
        produk: [],
      }
    : {
        spbuUID: dialogData.idSPBU,
        produk: dialogData?.allProduk,
      };

  const validationSchema = yup.object().shape({
    produk: yup
      .array()
      .of(
        yup.object().shape({
          namaProduk: yup.string().required("Nama produk tidak boleh kosong"),
          kapasitasTangki: yup
            .string()
            .required("Kapasitas tangki tidak boleh kosong"),
        })
      )
      .min(1, "Produk Tidak Boleh Kosong")
      .required(),
  });

  const addFields = ({ values, setValues }) => {
    const produk = [...values.produk];
    produk.push({
      namaProduk: "",
      kapasitasTangki: "",
    });
    setValues({ ...values, produk });
  };

  const removeField = ({ values, setValues, index, resetForm }) => {
    const produk = [...values.produk];
    produk.splice(index, 1);
    resetForm();
    setValues({ ...values, produk });
  };
  return (
    <DialogWrapper>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
            try {
              await updateProdukSbpu(values);
              toast.success("Harga berhasil diupdate");
              dispatch(closeDialog());
            } catch (error) {
              toast.error(error);
            }
        //   console.log(values);
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
                  values.produk?.map((item, index) => {
                    return (
                      <Box
                        display="flex"
                        gap="10px"
                        justifyContent="center"
                        alignItems="center"
                        key={index}
                      >
                        <Box flex="1">
                          <InputField
                            type="text"
                            name={`produk.${index}.namaProduk`}
                            label="Nama Produk"
                            placeholder="Masukan Nama Produk"
                          />
                        </Box>
                        <Box flex="1">
                          <InputField
                            type="number"
                            inputProps={{ min: 0 }}
                            name={`produk.${index}.kapasitasTangki`}
                            label="Kapasitas Tangki"
                            placeholder="Masukan Kapasitas Tangki"
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
                Upload Produk
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </DialogWrapper>
  );
}
