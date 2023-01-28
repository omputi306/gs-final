import React from "react";
import { Box, Chip, ListItem, ListItemText, Typography } from "@mui/material";
import InsertInvitationIcon from "@mui/icons-material/InsertInvitation";
import ScheduleIcon from "@mui/icons-material/Schedule";
import moment from "moment";
import truncate from "just-truncate";
import { useDispatch } from "react-redux";
import { openDialog } from "../../../../../../apps/store/reducers/dialogReducer";

export default function ListItemPesan({ item }) {
  const dispatch = useDispatch();
  console.log("list item Pesan", item?.id);
  return (
    <ListItem
      className="listItem"
      onClick={() =>
        dispatch(
          openDialog({
            dialogType: "Pesan",
            dialogData: {
              message: item,
            },
          })
        )
      }
    >
      <ListItemText
        className="listItemText"
        primary={
          <>
            <Typography
              component="h4"
              sx={!item.clicked ? { fontWeight: "600" } : null}
            >
              {item.judul}
            </Typography>
          </>
        }
        secondary={
          <>
            <Typography
              component="span"
              sx={{ transition: "none", fontSize: "13px" }}
            >
              {truncate(item.pesan, "40")}
            </Typography>
            <Box display="flex" justifyContent="space-between">
              <Chip
                variant="outlined"
                size="small"
                icon={<InsertInvitationIcon />}
                label={moment(item.creationDate).format("dddd, DD MMM YYYY")}
              />
              <Chip
                variant="outlined"
                size="small"
                icon={<ScheduleIcon />}
                label={moment(item.creationDate).format("HH:mm")}
              />
            </Box>
          </>
        }
      />
    </ListItem>
  );
}
