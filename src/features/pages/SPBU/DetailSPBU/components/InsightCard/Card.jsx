import React from "react";
import { Box, Paper } from "@mui/material";
import { CircularProgressbar } from "react-circular-progressbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGasPump } from "@fortawesome/free-solid-svg-icons";

export default function Card({icon, produk, stok}) {
  return (
    <Paper sx={{ padding: "10px" }}>
      <Box display="flex">
        <Box flex="1">
          <Box>
            <FontAwesomeIcon
              icon={faGasPump}
              style={{
                background: "red",
                padding: 8,
                height: 20,
                width: 20,
                borderRadius: "50%",
              }}
            />
          </Box>
          <Box>
            <h3>{produk}</h3>
          </Box>
          <Box>
            <h2>{stok} Liter</h2>
          </Box>
          <Box>
            <small>Last 24 hours</small>
          </Box>
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <CircularProgressbar
            className="progress-bar"
            value="60"
            text={`60%`}
          />
        </Box>
      </Box>
    </Paper>
  )
}
