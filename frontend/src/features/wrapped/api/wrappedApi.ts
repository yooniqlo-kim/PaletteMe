import { api } from "@/shared/api/core";
import { RawWrappedApiResponse } from "@shared/types/api/wrapped";

export const fetchWrapped = async (): Promise<RawWrappedApiResponse> => {
  const response = await api.get("/mymuseum/wrapped");
  return response.data.data;
};
