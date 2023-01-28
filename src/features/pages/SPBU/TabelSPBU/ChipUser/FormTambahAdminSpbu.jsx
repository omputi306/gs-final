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
import { Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import DialogWrapper from "../../../../../apps/common/Dialog/DialogWrapper";
import SelectInputField from "../../../../../apps/common/Forms/SelectInputField";
import { closeDialog } from "../../../../../apps/store/reducers/dialogReducer";
import InputField from "../../../../../apps/common/Forms/InputField";
import * as yup from "yup";
import { updateAdminSpbu } from "../../../../../apps/services/firestoreServices";

export default function FormTambahAdminSpbu() {
  const dispatch = useDispatch();
  const { dialogData } = useSelector((state) => state.dialogs);

  const initialValues = {
    spbuUID: dialogData?.spbu?.spbuUID,
    namaSPBU: dialogData?.spbu?.namaSPBU,
    uid: "",
  };

  const schema = yup.object().shape({
    uid: yup.string().required("User tidak boleh kosong"),
  });
  return (
    <DialogWrapper>
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={(values) => updateAdminSpbu(values)}
      >
        {({ setFieldValue, resetForm }) => (
          <Form>
            <DialogTitle>
              Update Admin SPBU
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
                <InputField name="spbuUID" label="ID SPBU" disabled />
              </Box>
              <Box>
                <InputField name="namaSPBU" label="Nama SPBU" disabled />
              </Box>
              <Box>
                <SelectInputField
                  name="uid"
                  label="Pilih User Admin"
                  options={dialogData?.users?.map((user) => {
                    return {
                      key: user.id,
                      label: `${user.id}-${user.displayName}`,
                      value: user.id,
                    };
                  })}
                  onChange={(e) => setFieldValue("uid", e.target.value)}
                />
              </Box>
            </DialogContent>
            <DialogActions>
              <Button type="submit" variant="contained">
                Terapkan Admin
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </DialogWrapper>
  );
}
