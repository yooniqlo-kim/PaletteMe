import { api } from "./core";

export const fetchPopularArtworks = async (): Promise<string[]> => {
  const response = await api.get("/ranking");
  return response.data.data;
};