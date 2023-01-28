import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./features/pages/Dashboard/Dashboard";
import Spbu from "./features/pages/SPBU/Spbu";
import ListSPBU from "./features/pages/SPBU/ListSPBU";
import DetailSpbu from "./features/pages/SPBU/DetailSPBU/DetailSpbu";
import Pesan from "./features/pages/SPBU/DetailSPBU/components/Pesan/Pesan";
import Users from "./features/pages/Users/Users"
import ListUsers from "./features/pages/Users/ListUsers"

export default function MainRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate replace to="dashboard" />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="spbu" element={<Spbu />}>
          <Route path="/spbu" element={<Navigate replace to="list-spbu" />} />
          <Route path="list-spbu" element={<ListSPBU />} />
          <Route path="/spbu/:id" element={<DetailSpbu />} />
        </Route>
        <Route path="messages" element={<Pesan />}>
          <Route path="/messages" element={<Navigate replace to="inbox" />} />
        </Route>
        <Route path="users" element={<Users />}>
          <Route path="/users" element={<Navigate replace to="list-users" />} />
          <Route path="list-users" element={<ListUsers />} />
        </Route>
      </Routes>
    </>
  );
}
