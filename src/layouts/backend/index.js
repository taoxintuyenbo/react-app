import React from "react";
import { Outlet } from "react-router-dom";
// import Navbar from "./navbar";
// import Sidebar from "./sidebar";

function LayoutBackend() {
  return (
    <div>
      <Outlet />
    </div>
  );
}

export default LayoutBackend;
