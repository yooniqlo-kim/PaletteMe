import { useState, useEffect } from "react";
import IconLeftArrow from "@/shared/components/icons/IconLeftArrow";
import IconRightArrow from "@/shared/components/icons/IconRightArrow";
import { ArtworkCard } from "@/shared/components/artworks/ArtworkCard";
import type { BaseArtwork } from "@shared/types/artwork";
import { useNavigate } from "react-router-dom";

type Props = {
  artworks: BaseArtwork[];
  isLoading?: boolean;
};

export default function RecommendationArtworks({ artworks }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedArtworks, setLikedArtworks] = useState<string[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    setCurrentIndex(0); // 인덱스 초기화
  }, [artworks]);

  const currentArtwork = artworks[currentIndex];

  const showPrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? artworks.length - 1 : prev - 1
    );
  };

  const showNext = () => {
    setCurrentIndex((prev) =>
      (prev + 1) % artworks.length
    );
  };

  const toggleLike = (id: string) => {
    setLikedArtworks((prev) =>
      prev.includes(id)
        ? prev.filter((artId) => artId !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="mt-4 w-full flex justify-center items-center gap-4 px-4">
      {/* 왼쪽 화살표 */}
      <button
        onClick={showPrev}
        disabled={artworks.length === 0}
        className="w-10 h-10 max-sm:w-8 max-sm:h-8 max-[500px]:w-6 max-[500px]:h-6 
                 flex items-center justify-center disabled:opacity-30 disabled:cursor-default"
      >
        <IconLeftArrow />
      </button>

      {/* 카드 */}
      <div className="flex justify-center items-center w-full">
        <div className="w-full max-w-[260px] aspect-[1/1]">
          {currentArtwork ? (
            <ArtworkCard
              key={currentArtwork.artworkId}
              artwork={{
                ...currentArtwork,
                isLiked: likedArtworks.includes(currentArtwork.artworkId ?? ""),
              }}
              size="large"
              borderRadius="small"
              theme="light"
              onClickLike={() =>
                currentArtwork.artworkId &&
                toggleLike(currentArtwork.artworkId)
              }
              onClick={() => {
                if (currentArtwork.artworkId) {
                  navigate(`/artwork/${currentArtwork.artworkId}`);
                }
              }}
            />
          ) : (
            <div className="w-full h-full bg-gray-100 rounded-lg animate-pulse" />
          )}
        </div>
      </div>

      {/* 오른쪽 화살표 */}
      <button
        onClick={showNext}
        disabled={artworks.length === 0}
        className="w-10 h-10 max-sm:w-8 max-sm:h-8 max-[500px]:w-6 max-[500px]:h-6 
                 flex items-center justify-center disabled:opacity-30 disabled:cursor-default"
      >
        <IconRightArrow />
      </button>
    </div>
  );
}
