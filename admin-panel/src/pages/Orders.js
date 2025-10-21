import React, { useEffect, useState } from "react";
import DataTable from "../components/DataTable";
import { getOrders } from "../services/orderService";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getOrders().then((res) => setOrders(res));
  }, []);

  const columns = [
    { field: "_id", headerName: "ID", width: 200 },
    { field: "customerName", headerName: "Customer", width: 150 },
    { field: "status", headerName: "Status", width: 120 },
    { field: "total", headerName: "Total (৳)", width: 150 }
  ];

  return (
    <div>
      <h2>Orders Management</h2>
      <DataTable rows={orders} columns={columns} />
    </div>
  );
};

export default Orders;
