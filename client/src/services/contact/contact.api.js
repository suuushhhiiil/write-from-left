import api from "@/lib/axios";

export const sendContactMessage = async (payload) => {
  const { data } = await api.post("/contact", payload);
  return data;
};
