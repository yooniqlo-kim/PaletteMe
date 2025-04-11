import { api } from "@/shared/api/core";
import {
  RecommendationFilter,
  RecommendedArtwork,
} from "@/shared/api/recommendation";

// filter 값에 따라 엔드포인트 경로 매핑
const endpointMap: Record<RecommendationFilter, string> = {
  age: "age",
  favorite_artist: "artist",
  similar_taste: "similar",
  color: "color",
};

// 추천 작품 API 호출 함수
export async function fetchRecommendationsByFilter(
  filter: RecommendationFilter,
  size: number = 10 // 기본값: 10개 추천
): Promise<RecommendedArtwork[]> {
  const endpoint = endpointMap[filter];

  const res = await api.get<{ data: RecommendedArtwork[] }>(
    `/mymuseum/recommend/${endpoint}`,
    {
      params: {
        size,
      },
    }
  );

  // 서버 응답 구조에 맞게 배열 반환
  return res.data.data;
}
