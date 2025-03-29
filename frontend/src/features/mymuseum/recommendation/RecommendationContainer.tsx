import { useState, useEffect } from "react";
import RecommendedFilterChips from "./RecommendedFilterChips";
import RecommendationArtworks from "./RecommendationArtworks";

import { mockArtworksMeta } from "@shared/dummy/mymuseumDummy";
import { mapRecommendedToArtwork } from "@/shared/types/artwork";
import type { Artwork } from "@/shared/types/artwork";

export default function RecommendationContainer() {
  const [selectedFilter, setSelectedFilter] = useState<string>("age");
  const [artworks, setArtworks] = useState<Artwork[]>([]);

  useEffect(() => {
    if (!selectedFilter) {
      setArtworks([]);
      return;
    }

    // ✅ 추천 작품 메타 → artwork 타입으로 변환
    const raw = mockArtworksMeta[selectedFilter] || [];
    const mapped = raw.map(mapRecommendedToArtwork);
    setArtworks(mapped);
  }, [selectedFilter]);

  return (
    <div>
      <RecommendedFilterChips
        selected={selectedFilter}
        onSelect={setSelectedFilter}
      />
      <RecommendationArtworks
      key={selectedFilter}
      artworks={artworks}
      />
    </div>
  );
}
