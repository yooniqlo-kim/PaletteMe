import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import RecommendedFilterChips from "./RecommendedFilterChips";
import RecommendationArtworks from "./RecommendationArtworks";

import type {
  RecommendationFilter,
} from "@/shared/api/recommendation";
import { mapRecommendedToArtwork } from "@/shared/utils/mapRecommendedToArtwork";
import { fetchRecommendationsByFilter } from "@features/mymuseum/recommendation/api/fetchRecommendationsByFilter";
import type { BaseArtwork } from "@/shared/types/artwork";

const initialCache: Record<RecommendationFilter, BaseArtwork[]> = {
  age: [],
  favorite_artist: [],
  similar_taste: [],
  color: [],
};

export default function RecommendationContainer() {
  const [selectedFilter, setSelectedFilter] =
    useState<RecommendationFilter>("age");

  const [artworks, setArtworks] = useState<BaseArtwork[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const [cache, setCache] = useState(initialCache);

  useEffect(() => {
    return () => {
      setCache(initialCache);
    };
  }, [location.pathname]);
  

  useEffect(() => {
    const fetchData = async () => {
      const cached = cache[selectedFilter];
      if (cached && cached.length > 0) {
        setArtworks(cached);
        return;
      }
  
      setIsLoading(true);
      try {
        const size = 10;
        const rawData = await fetchRecommendationsByFilter(selectedFilter, size);
  
        const mapped = rawData.map(
          mapRecommendedToArtwork
        ) as (BaseArtwork & { isLiked?: boolean })[];
  
        setArtworks(mapped);
        setCache((prev) => ({ ...prev, [selectedFilter]: mapped }));
      } catch (err) {
        console.error("추천 작품 로딩 실패:", err);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFilter]);
  

  return (
    <div className="w-full max-w-[23.75rem] mx-auto px-4 max-[412px]:px-2">
      <RecommendedFilterChips
        selected={selectedFilter}
        onSelect={(value) => setSelectedFilter(value as RecommendationFilter)}
      />
  
      <RecommendationArtworks
        key={selectedFilter}
        artworks={artworks}
        isLoading={isLoading}
      />
    </div>
  );
}
