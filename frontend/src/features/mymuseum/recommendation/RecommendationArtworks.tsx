import { useState, useEffect } from "react";
import IconLeftArrow from "@/shared/components/icons/IconLeftArrow";
import IconRightArrow from "@/shared/components/icons/IconRightArrow";
import { ArtworkCard } from "@/shared/components/artworks/ArtworkCard";
import type { BaseArtwork } from "@shared/types/artwork";
import { useNavigate } from "react-router-dom";

type Props = {
  artworks: BaseArtwork[];
  onReachEnd?: () => void;
};

export default function RecommendationArtworks({
  artworks,
  onReachEnd,
}: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedArtworks, setLikedArtworks] = useState<string[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    setCurrentIndex(0);
  }, [artworks]);

  const currentArtwork = artworks[currentIndex];
  const isLast = currentIndex === artworks.length - 1;

  const showPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const showNext = () => {
    if (!isLast) {
      setCurrentIndex((prev) => prev + 1);
    }
    if (isLast && onReachEnd) {
      onReachEnd();
    }
  };

  const toggleLike = (id: string) => {
    setLikedArtworks((prev) =>
      prev.includes(id) ? prev.filter((artId) => artId !== id) : [...prev, id]
    );
  };

  return (
    <div className="relative mt-4 w-fit mx-auto">
      {/* 왼쪽 화살표 */}
      <button
        onClick={showPrev}
        disabled={currentIndex === 0}
        className="absolute left-[-2rem] top-1/2 -translate-y-1/2 z-10 disabled:opacity-30 disabled:cursor-default"
      >
        <IconLeftArrow />
      </button>

      {/* 작품 카드 */}
      {currentArtwork && (
        <ArtworkCard
          key={currentArtwork.artworkId}
          artwork={{
            ...currentArtwork,
            liked: likedArtworks.includes(currentArtwork.artworkId ?? ""),
          }}
          size="large"
          borderRadius="small"
          theme="light"
          onClickLike={() =>
            currentArtwork.artworkId && toggleLike(currentArtwork.artworkId)
          }
          onClick={() => {
            if (currentArtwork.artworkId) {
              navigate(`/artwork/${currentArtwork.artworkId}`);
            }
          }}
        />
      )}

      {/* 오른쪽 화살표 */}
      <button
        onClick={showNext}
        disabled={artworks.length === 0}
        className="absolute right-[-2rem] top-1/2 -translate-y-1/2 z-10 disabled:opacity-30 disabled:cursor-default"
      >
        <IconRightArrow />
      </button>
    </div>
  );
}
