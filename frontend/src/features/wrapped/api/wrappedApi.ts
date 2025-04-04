import { api } from "@/shared/api/core";
import { WrappedData } from "@shared/api/wrapped";

export const fetchWrapped = async (): Promise<WrappedData> => {
  const response = await api.get("/mymuseum/wrapped");
  return response.data.data;
};