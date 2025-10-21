import React, { useEffect, useState } from "react";
import DataTable from "../components/DataTable";
import { getProducts } from "../services/productService";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts().then((res) => setProducts(res));
  }, []);

  const columns = [
    { field: "_id", headerName: "ID", width: 200 },
    { field: "name", headerName: "Name", width: 150 },
    { field: "category", headerName: "Category", width: 150 },
    { field: "price", headerName: "Price (৳)", width: 130 }
  ];

  return (
    <div>
      <h2>Product Management</h2>
      <DataTable rows={products} columns={columns} />
    </div>
  );
};

export default Products;
