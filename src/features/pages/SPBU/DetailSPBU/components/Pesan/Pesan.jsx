import React from "react";
import { Form, Formik } from "formik";
import {
  Box,
  Paper,
  DialogTitle,
  DialogContent,
  IconButton,
  DialogActions,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DialogWrapper from "../../../../../../apps/common/Dialog/DialogWrapper";
import SelectInputField from "../../../../../../apps/common/Forms/SelectInputField";
import { useDispatch, useSelector } from "react-redux";
import { closeDialog } from "../../../../../../apps/store/reducers/dialogReducer";
import { toast } from "react-toastify";
import { updateClickedPesan } from "../../../../../../apps/services/firestoreServices";

export default function Pesan() {
  const dispatch = useDispatch();
  const { dialogData } = useSelector((state) => state.dialogs);
  console.log("dialog Pesan", dialogData.message.id);

  async function confirmPesan(message) {
    try {
      !message.clicked
        ? await updateClickedPesan(message.id).then(() => {
            return dispatch(closeDialog());
          })
        : dispatch(closeDialog());
    } catch (error) {
      toast.error(error);
    }
  }
  return (
    <DialogWrapper maxWidth="xs">
      <Formik>
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
              Pesan Singkat
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
              <Box>
                <Box>Judul: {dialogData.message.judul}</Box>
                <Box>{dialogData.message.pesan}</Box>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button
                variant="contained"
                onClick={() => confirmPesan(dialogData.message)}
              >
                OK
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </DialogWrapper>
  );
}
