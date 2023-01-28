import React from "react";
import logo from "../../../apps/common/img/logo-gs.jpeg";
import "./Sidebar.css";
import {
  RegulerAdminSidebarItem,
  SidebarItem,
} from "../../../apps/common/Template-Data/Template_Data";
import { NavLink } from "react-router-dom";
import { signOutFirebase } from "../../../apps/services/firebaseServices";
import LogoutIcon from "@mui/icons-material/Logout";

export default function Sidebar({ selected, setSelected, currentUserLogin }) {
  function sidebarItem(data) {
    return (
      <>
        {data.map((item, index) => {
          return (
            <NavLink
              className=""
              key={index}
              to={item.url}
              onClick={item.func ? item.func : null}
            >
              <item.icon />
              <h3>{item.title}</h3>
              {item.span && <span className="notif">{item.span}</span>}
            </NavLink>
          );
        })}
      </>
    );
  }

  return (
    <aside>
      <div className="top">
        <div className="logo">
          <img src={logo} alt="" />
        </div>
        <div className="title">
          <h2>Gunung Selatan</h2>
        </div>
      </div>
      <div className="sidebar">
        {/* {currentUserLogin?.premiumAccount
          ? sidebarItem(SidebarItem)
          : sidebarItem(RegulerAdminSidebarItem)} */}
        {sidebarItem(SidebarItem)}
      </div>
    </aside>
  );
}