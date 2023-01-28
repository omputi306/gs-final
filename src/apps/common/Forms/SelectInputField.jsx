import React from "react";
import { useField } from "formik";
import { Box } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function SelectInputField({ ...props }) {
  const [field, meta] = useField(props);

  return (
    <Box m="10px 0 10px 0" width="100%">
      <FormControl fullWidth size="small" error={meta.error && meta.touched}>
        <InputLabel id="demo-simple-select-helper-label">
          {props.label}
        </InputLabel>
        <Select label={props.label} {...field} {...props}>
          {props.options ? (
            props.options?.map((option) => (
              <MenuItem key={option.key} value={option.value}>
                {option.label}
              </MenuItem>
            ))
          ) : (
            <MenuItem>
              <em>Empty</em>
            </MenuItem>
          )}
        </Select>
        {meta.error && meta.touched ? (
          <FormHelperText sx={{ color: "red" }}>{meta.error}</FormHelperText>
        ) : null}
      </FormControl>
    </Box>
  );
}
