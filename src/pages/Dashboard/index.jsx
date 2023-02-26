import React from "react";
import AppBar from "@mui/material/AppBar";
import { Container } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import Welcome from "./Welcome";
import Account from "./Account";

const Dashboard = () => {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="account" element={<Account />} />
    </Routes>
  );
};

export default Dashboard;
