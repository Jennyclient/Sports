// services/users.service.ts

import { api } from "@/services/interceptor";

export const getUsers = async () => {
  const response = await api.get("/users");
  return response.data;
};