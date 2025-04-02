import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import SearchContainer from "@/features/search/SearchContainer";
import SearchResultList from "@/features/search/SearchResultList";
import SearchRecommendationList from "@/features/search/SearchRecommendationList";
import SearchRecommendationResult from "@/features/search/SearchRecommendationResult";
import { getSearchArtworks, ArtworkSearchItem } from "@shared/api/search";
import { searchDummy } from "@shared/dummy/seachThumbnailDummy";

export default function SearchPage() {
  const [searchValue, setSearchValue] = useState("");
  const [likedArtworks, setLikedArtworks] = useState<string[]>([]);
  const [searchResult, setSearchResult] = useState<ArtworkSearchItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchResultWithLikes = searchResult.map((item) => ({
    ...item,
    isLiked: likedArtworks.includes(item.artworkId),
  }));
  

  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const from = searchParams.get("from");
  const isFromRecommendation = from === "recommendation";
  const navigate = useNavigate();

  useEffect(() => {
    setSearchValue(query);

    const fetchSearchResults = async () => {
      if (!query) return;

      try {
        setIsLoading(true);
        setError(null);
        const data = await getSearchArtworks(query, 10);
        setSearchResult(data);
      } catch (err) {
        console.error("검색 실패:", err);
        setError("검색 중 문제가 발생했어요.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSearchResults();
  }, [query]);

  const handleCardClick = (id: string) => {
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

  const toggleLike = (id: string) => {
    setLikedArtworks((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // 추천 검색 결과일 경우 별도 레이아웃
  if (isFromRecommendation && query) {
    return (
      <SearchRecommendationResult
        query={query}
        data={searchResultWithLikes}
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
            data={searchResult}
            onCardClick={handleCardClick}
            onCardLike={toggleLike}
            likedArtworks={likedArtworks}
            query={query}
            isLoading={isLoading}
            error={error}
          />
        ) : (
          <SearchRecommendationList data={searchDummy} />
        )}
      </div>
    </div>
  );
}
