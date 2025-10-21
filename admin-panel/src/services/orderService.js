import api from "./api";

export const getOrders = async () => {
  const { data } = await api.get("/admin/orders");
  return data;
};
