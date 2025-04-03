import { api } from "./core";

export const getArtworkDetail = async (artworkId: string) => {
  const res = await api.get(`/artworks/${artworkId}`);
  const { success, data, errorMsg } = res.data;
  if (!success || !data) {
    throw new Error(errorMsg ?? "작품 정보를 불러오는 데 실패했습니다.");
  }
  return data;
};

export const getAIDescription = async (artworkId: string): Promise<string> => {
  const res = await api.get(`/artworks/${artworkId}/description`);
  return res.data.data.description;
};
