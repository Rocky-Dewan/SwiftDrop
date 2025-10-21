import React, { useEffect, useState } from "react";
import DataTable from "../components/DataTable";
import { getUsers } from "../services/userService";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers().then((res) => setUsers(res));
  }, []);

  const columns = [
    { field: "_id", headerName: "ID", width: 200 },
    { field: "name", headerName: "Name", width: 150 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "role", headerName: "Role", width: 120 }
  ];

  return (
    <div>
      <h2>Users Management</h2>
      <DataTable rows={users} columns={columns} />
    </div>
  );
};

export default Users;
