import api from "@/lib/axios";

export const login = async ({ email, password }) => {
  const { data } = await api.post("/auth/login", { email, password });
  return data.data;
};

export const logout = async () => {
  await api.post("/auth/logout");
};

export const getCurrentUser = async () => {
  const { data } = await api.get("/auth/me");
  return data.data;
};

export const refreshSession = async () => {
  const { data } = await api.post("/auth/refresh");
  return data.data;
};
