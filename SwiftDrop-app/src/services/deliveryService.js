import api from "./api";

export const loginAgentAPI = async (credentials) => {
  const { data } = await api.post("/delivery/login", credentials);
  return data;
};

export const getAssignedOrders = async () => {
  const { data } = await api.get("/delivery/orders");
  return data;
};

