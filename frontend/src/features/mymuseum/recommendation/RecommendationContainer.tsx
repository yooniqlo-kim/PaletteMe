import { useState, useEffect } from "react";
import RecommendedFilterChips from "./RecommendedFilterChips";
import RecommendationArtworks from "./RecommendationArtworks";

import { recommendationDummy } from "@/shared/dummy/recommendationDummy";
import type {
  RecommendationFilter,
  RecommendedArtwork,
} from "@/shared/api/recommendation";
import { mapRecommendedToArtwork } from "@/shared/utils/mapRecommendedToArtwork";
import { fetchRecommendationsByFilter } from "@features/mymuseum/recommendation/api/fetchRecommendationsByFilter";
import type { BaseArtwork } from "@/shared/types/artwork";

export default function RecommendationContainer() {
  const [selectedFilter, setSelectedFilter] =
    useState<RecommendationFilter>("age");
  const [artworks, setArtworks] = useState<BaseArtwork[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        let rawData: RecommendedArtwork[];

        // API가 준비되면 이 조건문 전체 삭제
        if (selectedFilter === "age") {
          rawData = recommendationDummy.age;
        } else {
          rawData = await fetchRecommendationsByFilter(selectedFilter);
        }

        // 최종 버전은 이렇게 바뀜:
        // const rawData = await fetchRecommendationsByFilter(selectedFilter);

        const mapped = rawData.map(
          mapRecommendedToArtwork
        ) as (BaseArtwork & { isLiked?: boolean })[];

        setArtworks(mapped);
      } catch (err) {
        console.error("추천 작품 로딩 실패:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [selectedFilter]);

  return (
    <div>
      <RecommendedFilterChips
        selected={selectedFilter}
        onSelect={(value) => setSelectedFilter(value as RecommendationFilter)}
      />

      {/* 항상 렌더링되도록 수정 */}
      <RecommendationArtworks
        key={selectedFilter}
        artworks={artworks}
        isLoading={isLoading}
      />
    </div>
  );
}
