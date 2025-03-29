// features/recommendation/components/RecommendationContainer.tsx

import { useState, useEffect } from "react";
import RecommendedFilterChips from './RecommendedFilterChips';
import RecommendationArtworks from './RecommendationArtworks';
import { mockArtworks, Artwork } from '@/shared/dummy/mymuseumDummy';

export default function RecommendationContainer() {
  const [selectedFilter, setSelectedFilter] = useState<string>("연령");
  const [artworks, setArtworks] = useState<Artwork[]>([]);

  useEffect(() => {
    if (!selectedFilter) {
      setArtworks([]);
      return;
    }

    // 나중에 API 연동 시 여기만 교체하면 됨
    const filtered = mockArtworks[selectedFilter] || [];
    setArtworks(filtered);
  }, [selectedFilter]);

  return (
    <div>
      <RecommendedFilterChips
        selected={selectedFilter}
        onSelect={setSelectedFilter}
      />
      <RecommendationArtworks artworks={artworks} />
    </div>
  );
}
