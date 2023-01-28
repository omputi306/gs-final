import React from "react";
import { Box, TextField } from "@mui/material";
import { useField } from "formik";
import { NumericFormat } from "react-number-format";

export default function NumericInput({ ...props }) {
  const [field, meta] = useField(props);
//   console.log(...props);
  return (
    <Box m="10px 0 10px 0" width="100%">
      <NumericFormat
        customInput={TextField}
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