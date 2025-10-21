import React, { useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Navbar = () => {
  const { admin } = useContext(AdminContext);

  return (
    <div style={{
      backgroundColor: "#ffffff",
      boxShadow: "0px 1px 4px rgba(0,0,0,0.1)",
      padding: "10px 20px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }}>
      <h3 style={{ color: "#2f3640" }}>Admin Dashboard</h3>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <AccountCircleIcon />
        <span>{admin?.name || "Admin"}</span>
      </div>
    </div>
  );
};

export default Navbar;
