import api from "./api";

export const getUsers = async () => {
  const { data } = await api.get("/admin/users");
  return data;
};
