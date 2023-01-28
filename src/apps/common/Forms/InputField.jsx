import React from "react";
import { useField } from "formik";
import { Box, TextField } from "@mui/material";

export default function InputField({ ...props }) {
  const [field, meta] = useField(props);

  return (
    <Box m="10px 0 10px 0" width="100%">
      <TextField
        size="small"
        variant="outlined"
        fullWidth
        {...field}
        {...props}
        error={meta.touched && Boolean(meta.error)}
        helperText={meta.touched && meta.error}
      />
    </Box>
  );
}
