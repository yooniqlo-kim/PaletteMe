import { useState, useEffect } from "react";
import RecommendedFilterChips from './RecommendedFilterChips';
import RecommendationArtworks from './RecommendationArtworks';

export type Artwork = {
  id: number;
  imageUrl: string;
};

// 더미 데이터
const mockArtworks: Record<string, Artwork[]> = {
  연령: [
    { id: 1, imageUrl: "" },
    { id: 2, imageUrl: "" },
  ],
  선호작가: [
    { id: 3, imageUrl: "" },
    { id: 4, imageUrl: "" },
  ],
  유사취향: [
    { id: 5, imageUrl: "" },
    { id: 6, imageUrl: "" },
  ],
  색깔: [
    { id: 7, imageUrl: "" },
    { id: 8, imageUrl: "" },
  ],
};

export default function RecommendationContainer() {
  const [selectedFilter, setSelectedFilter] = useState<string>("연령");
  const [artworks, setArtworks] = useState<Artwork[]>([]);

  useEffect(() => {
    if (!selectedFilter) {
      setArtworks([]);
      return;
    }

    // API 요청으로 교체 예정
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
