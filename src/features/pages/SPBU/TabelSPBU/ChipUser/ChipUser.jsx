import React from "react";
import { Avatar, Chip, IconButton } from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { openDialog } from "../../../../../apps/store/reducers/dialogReducer";
import {
  deleteAdminSpbu,
  deleteUserSpbu,
} from "../../../../../apps/services/firestoreServices";
import { toast } from "react-toastify";

export default function ChipUser({ uid, spbu, listUser, loading }) {
  const dispatch = useDispatch();
  const userAdmin = useSelector((state) =>
    state.users.listUser.find((e) => e.id === uid)
  );

  async function handleDelete({ uid, spbu }) {
    try {
      await deleteUserSpbu({ uid, spbu });
      toast.success(`Admin pada ${spbu.namaSPBU} berhasil dihapus`);
    } catch (error) {
      toast.error(error);
    }
  }

  if (loading) return <>Loading...</>;
  return (
    <>
      {uid ? (
        <Chip
          avatar={<Avatar alt="photo" src={userAdmin?.photoURL || null} />}
          label={userAdmin?.displayName}
          //   onClick={handleClick}
          onDelete={() => handleDelete({ uid, spbu })}
          deleteIcon={<DeleteIcon />}
          variant="outlined"
        />
      ) : (
        <IconButton
          onClick={() =>
            dispatch(
              openDialog({
                dialogType: "FormTambahAdminSpbu",
                dialogData: {
                  users: listUser,
                  spbu: spbu,
                },
              })
            )
          }
        >
          <PersonAddIcon />
        </IconButton>
      )}
    </>
  );
}
