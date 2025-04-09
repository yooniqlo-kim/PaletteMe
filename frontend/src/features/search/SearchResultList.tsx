import { useEffect, useRef, useState } from "react";
import SearchResultCard from "./SearchResultCard";
import { ArtworkSearchItem } from "@shared/api/search";
import { likeArtwork, cancelLikeArtwork } from "@/shared/api/artwork";

interface Props {
  data: ArtworkSearchItem[];
  onCardClick: (id: string) => void;
  query?: string;
  isLoading?: boolean;
  error?: string | null;
  onIntersect?: () => void;
  hasMore?: boolean;
}

export default function SearchResultList({
  data,
  onCardClick,
  query,
  isLoading,
  error,
  onIntersect,
  hasMore,
}: Props) {
  const observerRef = useRef<HTMLDivElement | null>(null);
  const [likedArtworks, setLikedArtworks] = useState<string[]>([]);
  const likedArtworksRef = useRef<string[]>([]);

  // Intersection Observer
  useEffect(() => {
    if (!onIntersect || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          onIntersect();
        }
      },
      { threshold: 0.5 }
    );

    const el = observerRef.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, [onIntersect, hasMore]);


  useEffect(() => {
    const newLiked = data
      .filter(
        (item) => item.isLiked && !likedArtworksRef.current.includes(item.artworkId)
      )
      .map((item) => item.artworkId);
  
    if (newLiked.length > 0) {
      setLikedArtworks((prev) => {
        const updated = [...prev, ...newLiked];
        likedArtworksRef.current = updated;
        return updated;
      });
    }
  }, [data]);
  


  // 좋아요 토글 핸들러
  const handleCardLike = async (id: string) => {
    const isLiked = likedArtworks.includes(id);
    try {
      if (isLiked) {
        await cancelLikeArtwork(id);
        setLikedArtworks((prev) => prev.filter((artId) => artId !== id));
      } else {
        await likeArtwork(id);
        setLikedArtworks((prev) => [...prev, id]);
      }
    } catch (error) {
      console.error("좋아요 처리 실패", error);
      alert("좋아요 처리에 실패했습니다.");
    }
  };

  if (isLoading && data.length === 0) {
    return (
      <p className="col-span-2 text-center text-gray-500 mt-10">
        검색 중입니다...
      </p>
    );
  }

  if (error) {
    return (
      <p className="col-span-2 text-center text-red-500 mt-10">{error}</p>
    );
  }

  if (data.length === 0) {
    return (
      <p className="col-span-2 text-center text-gray-500 mt-10">
        검색 결과가 없습니다.
      </p>
    );
  }

  return (
    <>
      {query && (
        <p className="text-[var(--color-neutral-8)] text-[var(--text-lg)] font-semibold font-pretendard mb-2">
          <span className="text-[var(--color-primary)]">‘{query}’</span>
          에 대한 검색 결과
        </p>
      )}

      <div className="grid grid-cols-2 gap-4 justify-items-center">
        {data.map((artwork, idx) => {
          const isLast = idx === data.length - 1;
          const isLiked = likedArtworks.includes(artwork.artworkId);

          return (
            <div
              key={artwork.artworkId}
              ref={isLast ? observerRef : null}
              className="w-full max-w-[180px]"
            >
              <SearchResultCard
                artwork={{ ...artwork, isLiked }}
                onClick={() => onCardClick(artwork.artworkId)}
                onClickLike={() => handleCardLike(artwork.artworkId)}
                disabled={false}
              />
            </div>
          );
        })}
      </div>

    </>
  );
}
