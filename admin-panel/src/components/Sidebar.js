import React from "react";
import { Link, useLocation } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import PeopleIcon from "@mui/icons-material/People";
import SettingsIcon from "@mui/icons-material/Settings";

const Sidebar = () => {
  const location = useLocation();

  const menu = [
    { name: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
    { name: "Orders", icon: <ShoppingCartIcon />, path: "/orders" },
    { name: "Products", icon: <Inventory2Icon />, path: "/products" },
    { name: "Users", icon: <PeopleIcon />, path: "/users" },
    { name: "Settings", icon: <SettingsIcon />, path: "/settings" }
  ];

  return (
    <div style={{
      width: "240px",
      backgroundColor: "#222f3e",
      color: "white",
      display: "flex",
      flexDirection: "column",
      padding: "10px"
    }}>
      <h2 style={{ textAlign: "center", padding: "10px" }}>Admin Panel</h2>
      {menu.map((item) => (
        <Link
          key={item.name}
          to={item.path}
          style={{
            color: location.pathname === item.path ? "#10ac84" : "white",
            padding: "12px",
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
            borderRadius: "6px",
            backgroundColor: location.pathname === item.path ? "#1e272e" : "transparent"
          }}
        >
          <span style={{ marginRight: "10px" }}>{item.icon}</span>
          {item.name}
        </Link>
      ))}
    </div>
  );
};

export default Sidebar;
