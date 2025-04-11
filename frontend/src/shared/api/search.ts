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
  isLiked: boolean;
}

export const getSearchArtworks = async (
    keyword: string,
    size: number = 10,
    lastArtworkId?: string,
    lastScore?: number
  ): Promise<ArtworkSearchItem[]> => {
    const res = await api.get("/search/artworks", {
      params: {
        keyword,
        size,
        ...(lastArtworkId && lastScore !== undefined && {
          lastArtworkId,
          lastScore,
        }),
      },
    });
  
    const { success, data } = res.data;
    if (!success || !data) return [];
  
    return data;
  };
  
