import React from "react";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import NightlightIcon from "@mui/icons-material/Nightlight";
import MenuIcon from "@mui/icons-material/Menu";
import UserImg from "../../apps/common/img/Default.jpg";
import { Box, Button, IconButton, Tooltip } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserPlus,
  faRightFromBracket,
  faFileCirclePlus,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
// import { signOutFirebase } from "../../../apps/services/firebaseServices";
// import {
//   asyncActionFinish,
//   asyncActionStart,
// } from "../../../apps/store/reducers/asyncReducer";
import { toast } from "react-toastify";
import { openDialog } from "../../apps/store/reducers/dialogReducer";
import { asyncActionFinish, asyncActionStart } from "../../apps/store/reducers/asyncReducer";
import { signOutFirebase } from "../../apps/services/firebaseServices";

export default function Header({
  authenticated,
  currentUserLogin,
  sidebarHide,
  setSidebarHide,
  darkMode,
  setDarkMode,
}) {
  const dispatch = useDispatch();
  return (
    <header>
      <div className="body">
        <button id="menu-btn" onClick={() => setSidebarHide(!sidebarHide)}>
          <MenuIcon />
        </button>
        <div className="right">
          <div className="top">
            <Box>
              <Tooltip title="Tambah Produk">
                <IconButton
                  onClick={() =>
                    dispatch(
                      openDialog({
                        dialogType: "DialogTambahProduk",
                      })
                    )
                  }
                >
                  <FontAwesomeIcon icon={faFileCirclePlus} />
                </IconButton>
              </Tooltip>
              <Tooltip title="Tambah User">
                <IconButton
                  onClick={() =>
                    dispatch(
                      openDialog({
                        dialogType: "UserForm",
                      })
                    )
                  }
                >
                  <FontAwesomeIcon icon={faUserPlus} />
                </IconButton>
              </Tooltip>
            </Box>
            <div className="theme-toggler">
              <WbSunnyIcon
                className={`toggler-icon ${!darkMode && "active"}`}
                onClick={() => setDarkMode(false)}
              />
              <NightlightIcon
                className={`toggler-icon ${darkMode && "active"}`}
                onClick={() => setDarkMode(true)}
              />
            </div>
            <div className="profile">
              <div className="info">
                <p>
                  Hey,{" "}
                  <b>
                    displayName
                    {/* {currentUserLogin?.displayName || currentUserLogin?.email} */}
                  </b>
                </p>
                <small className="text-muted">
                    Admin Reguler/Admin Premium
                  {/* {currentUserLogin?.premiumAccount
                    ? "Admin Premium"
                    : "Admin Reguler"} */}
                </small>{" "}
                <Tooltip title="Logout">
                  <IconButton
                    size="small"
                    onClick={async () => {
                      try {
                        dispatch(asyncActionStart());
                        await signOutFirebase();
                        toast.success("Anda berhasil logout");
                        dispatch(asyncActionFinish());
                      } catch (error) {
                        toast.error(error);
                      }
                    }}
                  >
                    <FontAwesomeIcon icon={faRightFromBracket} />
                  </IconButton>
                </Tooltip>
              </div>
              <div className="profile-photo">
                <img src={UserImg} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}