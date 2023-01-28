import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";
import ListItemPesan from "./ListItemPesan";

export default function ListPesan({ data, loading }) {
  return (
    <List
      dense="true"
      sx={{
        margin: 0,
        padding: 0,
        ".listItem:hover": {
          cursor: "pointer",
          backgroundColor: "rgb(25 118 210 / 50%)",
        },
      }}
    >
      {!loading ? (
        data?.length > 0 ? (
          data?.map((item) => <ListItemPesan key={item.id} item={item} />)
        ) : (
          <>Tidak Ada Pesan Baru</>
        )
      ) : (
        <>Loading....</>
      )}
    </List>
  );
}
