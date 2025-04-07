import { api } from "@/shared/api/core";
import {
  RecommendationFilter,
  RecommendedArtwork,
  RecommendationResponse,
} from "@/shared/api/recommendation";

const endpointMap: Record<RecommendationFilter, string> = {
  age: "age",
  favorite_artist: "artist",
  similar_taste: "similar",
  color: "color",
};

export async function fetchRecommendationsByFilter(
  filter: RecommendationFilter,
  size: number = 10 // 기본값
): Promise<RecommendedArtwork[]> {
  const endpoint = endpointMap[filter];

  const res = await api.get<RecommendationResponse>(
    `/mymuseum/recommend/${endpoint}`,
    {
      params: {
        size,
      },
    }
  );

  return res.data.data[filter] ?? [];
}

