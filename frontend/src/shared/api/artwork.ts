import { api } from "./core";

export const getArtworkDetail = async (artworkId: string) => {
  const res = await api.get(`/artworks/${artworkId}`);
  return res.data.data;
};
