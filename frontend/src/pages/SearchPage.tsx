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

  // 무한 스크롤 관련 상태
  const [hasMore, setHasMore] = useState(true);
  const [isFetchingNext, setIsFetchingNext] = useState(false);

  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const from = searchParams.get("from");
  const isFromRecommendation = from === "recommendation";
  const navigate = useNavigate();

  // 마지막 아이템 정보 추출
  const getLastItemInfo = (list: ArtworkSearchItem[]) => {
    const last = list[list.length - 1];
    return {
      lastArtworkId: last?.artworkId,
      lastScore: last?.score,
    };
  };

  // 다음 페이지 요청 함수
  const fetchNextPage = async () => {
    if (!hasMore || isFetchingNext || isLoading) return;
    setIsFetchingNext(true);

    try {
      const { lastArtworkId, lastScore } = getLastItemInfo(searchResult);
      const nextData = await getSearchArtworks(query, 10, lastArtworkId, lastScore);

      if (nextData.length === 0) {
        setHasMore(false);
        return;
      }

      setSearchResult((prev) => [...prev, ...nextData]);
    } catch (err) {
      console.error("다음 페이지 로딩 실패:", err);
    } finally {
      setIsFetchingNext(false);
    }
  };

  // 초기 검색 요청
  useEffect(() => {
    setSearchValue(query);

    const fetchSearchResults = async () => {
      if (!query) return;

      try {
        setIsLoading(true);
        setError(null);
        setHasMore(true); // 새로운 검색마다 초기화
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
        data={searchResult}
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
            onIntersect={fetchNextPage} 
            hasMore={hasMore} 
          />
        ) : (
          <SearchRecommendationList data={searchDummy} />
        )}
      </div>
    </div>
  );
}
