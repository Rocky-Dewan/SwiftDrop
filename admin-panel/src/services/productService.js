import api from "./api";

export const getProducts = async () => {
  const { data } = await api.get("/admin/products");
  return data;
};
