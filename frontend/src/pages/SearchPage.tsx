import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import SearchContainer from "@/features/search/SearchContainer";
import SearchResultList from "@/features/search/SearchResultList";
import SearchRecommendationList from "@/features/search/SearchRecommendationList";
import SearchRecommendationResult from "@/features/search/SearchRecommendationResult";
import { searchDummy } from "@/shared/dummy/seachThumbnailDummy";

export default function SearchPage() {
  const [searchValue, setSearchValue] = useState("");
  const [likedArtworks, setLikedArtworks] = useState<number[]>([]);
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const from = searchParams.get("from");

  const isFromRecommendation = from === "recommendation";
  const navigate = useNavigate();

  useEffect(() => {
    setSearchValue(query);
  }, [query]);

  const handleCardClick = (id: number) => {
    navigate(`/artwork/${id}`);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      navigate(`/search?query=${encodeURIComponent(searchValue.trim())}`);
    }
  };

  const toggleLike = (id: number) => {
    setLikedArtworks((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredData = searchDummy.filter((artwork) =>
    artwork.overlayText.toLowerCase().includes(query.toLowerCase())
  );

  const enrichedData = filteredData.map((artwork) => ({
    ...artwork,
    isLiked: likedArtworks.includes(artwork.id),
  }));

  // 추천 검색 결과일 경우 별도 레이아웃
  if (isFromRecommendation && query) {
    return (
      <SearchRecommendationResult
        query={query}
        data={enrichedData}
        onCardLike={toggleLike}
      />
    );
  }

  // 일반 검색 페이지 (검색창 포함)
  return (
    <div className="px-4 py-6 pb-[5rem]">
      <SearchContainer
        value={searchValue}
        onChange={handleSearchChange}
        onKeyDown={handleSearchKeyDown}
        setValue={setSearchValue}
      />

      <div className="mt-6">
        {query ? (
          <SearchResultList
            data={enrichedData}
            onCardClick={handleCardClick}
            onCardLike={toggleLike}
            query={query}
          />
        ) : (
          <SearchRecommendationList data={searchDummy} />
        )}
      </div>
    </div>
  );
}
