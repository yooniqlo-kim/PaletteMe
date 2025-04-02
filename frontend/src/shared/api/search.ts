import { api } from "@/shared/api/core";

export interface ArtworkSearchItem {
  artworkId: string;
  originalTitle: string;
  korTitle: string;
  enTitle: string;
  originalArtist: string;
  korArtist: string;
  enArtist: string;
  imageUrl: string | null;
  score: number;
}

export const getSearchArtworks = async (
  keyword: string,
  size: number = 10
): Promise<ArtworkSearchItem[]> => {
  const res = await api.get("/search/artworks", {
    params: {
      keyword,
      size,
    },
  });

  return res.data?.data ?? [];
};
