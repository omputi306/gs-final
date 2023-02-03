import React from "react";
import { Formik, Form } from "formik";
// import DialogWrapper from "../../../../../apps/common/Dialog/DialogWrapper";
// import InputField from "../../../../../apps/common/Forms/InputField";
import {
  DialogActions,
  Button,
  DialogContent,
  IconButton,
  Typography,
  Box,
  DialogTitle,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
// import { closeDialog } from "../../../../../apps/store/reducers/dialogReducer";
import * as yup from "yup";
import { toast } from "react-toastify";
// import { addPesanToFirestore } from "../../../../../apps/services/firestoreServices";
import DialogWrapper from "../../../../../../apps/common/Dialog/DialogWrapper";
import { closeDialog } from "../../../../../../apps/store/reducers/dialogReducer";
import InputField from "../../../../../../apps/common/Forms/InputField";
import { addPesanToFirestore } from "../../../../../../apps/services/firestoreServices";

export default function ComposePesan() {
  const dispatch = useDispatch();
  const { dialogData } = useSelector((state) => state.dialogs);
  console.log(dialogData);
  const initialValues = {
    to: dialogData.spbuUID,
    judul: "",
    pesan: "",
  };
  const schema = yup.object().shape({
    to: yup.string().required("ID SPBU tidak boleh kosong"),
    judul: yup.string().required("Judul tidak boleh kosong"),
    pesan: yup.string().required("Pesan tidak boleh kosong"),
  });

  return (
    <DialogWrapper>
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={async (values, { setSubmitting, setErrors, resetForm }) => {
          try {
            await addPesanToFirestore(values);
            setSubmitting(false);
            toast.success(
              `Pesan singkat ke ${values.spbuUID} berhasil dikirim`
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
          errors,
        }) => (
          <Form>
            <DialogTitle sx={{ mb: 3 }}>
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
              <Box
                display="flex"
                gap={1}
                justifyContent="center"
                alignItems="center"
              >
                <InputField
                  name="to"
                  type="text"
                  placeholder="Penerima"
                  label="Penerima"
                  disabled
                />
              </Box>
              <Box
                display="flex"
                gap={1}
                justifyContent="center"
                alignItems="center"
              >
                <InputField
                  name="judul"
                  type="text"
                  placeholder="Judul Pesan"
                  label="Judul Pesan"
                  // disabled
                />
              </Box>
              <InputField
                name="pesan"
                type="text"
                placeholder="Ketik Pesan Baru"
                multiline
                rows={8}
              />
            </DialogContent>
            <DialogActions>
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
                Kirim
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </DialogWrapper>
  );
}
