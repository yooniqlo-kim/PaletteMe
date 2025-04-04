import { useNavigate } from "react-router-dom";
import { PageIntro } from "@shared/components/collection/PageIntro";
import ArtworkListSection from "@shared/components/collection/ArtworkListSection";
import { ArtworkCard } from "@shared/components/artworks/ArtworkCard";
import { ArtworkSearchItem } from "@shared/api/search";
import { useEffect, useRef } from "react";

interface Props {
  query: string;
  data: (ArtworkSearchItem & { isLiked: boolean })[];
  onCardLike: (id: string) => void;
  onIntersect?: () => void;
  hasMore?: boolean;
}

export default function SearchRecommendationResult({
  query,
  data,
  onCardLike,
  onIntersect,
  hasMore,
}: Props) {
  const navigate = useNavigate();
  const firstImageUrl = data[0]?.imageUrl ?? "";
  const observerRef = useRef<HTMLDivElement | null>(null);

  const handleClickArtwork = (artworkId: string): void => {
    navigate(`/artwork/${artworkId}`);
  };

  // 마지막 요소에 IntersectionObserver 연결
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

  return (
    <div className="min-h-screen">
      <PageIntro imageUrl={firstImageUrl}>
        <div className="flex flex-col items-start justify-end h-full px-4 pb-6 text-white">
          <h1 className="font-bold" style={{ fontSize: "var(--text-lg)" }}>
            ‘{query}’ 추천 작품
          </h1>
        </div>
      </PageIntro>

      <ArtworkListSection>
        {data.length === 0 ? (
          <div className="flex justify-center items-center h-40 text-neutral-6 text-sm">
            추천 작품이 없습니다.
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 pb-[5rem]">
            {data.map((artwork, idx) => {
              const isLast = idx === data.length - 1;

              return (
                <div key={artwork.artworkId} ref={isLast ? observerRef : null}>
                  <ArtworkCard
                    artwork={{
                      artworkId: artwork.artworkId,
                      title: artwork.korTitle || artwork.originalTitle,
                      artist: artwork.korArtist || artwork.originalArtist || "작가 미상",
                      artworkImageUrl: artwork.imageUrl ?? "",
                      isLiked: artwork.isLiked,
                    }}
                    size="small"
                    theme="light"
                    borderRadius="small"
                    onClick={() => handleClickArtwork(artwork.artworkId)}
                    onClickLike={() => onCardLike(artwork.artworkId)}
                  />
                </div>
              );
            })}
          </div>
        )}
      </ArtworkListSection>
    </div>
  );
}
