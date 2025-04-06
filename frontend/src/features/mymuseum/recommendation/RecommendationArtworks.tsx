import { useState, useEffect } from "react";
import IconLeftArrow from "@/shared/components/icons/IconLeftArrow";
import IconRightArrow from "@/shared/components/icons/IconRightArrow";
import { ArtworkCard } from "@/shared/components/artworks/ArtworkCard";
import { useNavigate } from "react-router-dom";
import { likeArtwork, cancelLikeArtwork } from "@/shared/api/artwork";

import type { BaseArtwork } from "@shared/types/artwork";

type ExtendedArtwork = BaseArtwork & { isLiked?: boolean };

type Props = {
  artworks: ExtendedArtwork[];
  isLoading?: boolean;
};

export default function RecommendationArtworks({ artworks }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedArtworks, setLikedArtworks] = useState<string[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    setCurrentIndex(0);
    const initiallyLiked = artworks
      .filter((a) => a.isLiked)
      .map((a) => a.artworkId);
    setLikedArtworks(initiallyLiked);
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

  const toggleLike = async (id: string) => {
    const isLiked = likedArtworks.includes(id);
    try {
      if (isLiked) {
        await cancelLikeArtwork(id);
      } else {
        await likeArtwork(id);
      }
      setLikedArtworks((prev) =>
        isLiked ? prev.filter((artId) => artId !== id) : [...prev, id]
      );
    } catch (error) {
      console.error("작품 좋아요 처리 실패:", error);
      alert("작품 좋아요 처리에 실패했어요.");
    }
  };

  return (
    <div className="mt-4 w-full flex justify-center items-center gap-4 px-4">
      {/* 왼쪽 화살표 */}
      <button
        onClick={showPrev}
        disabled={artworks.length === 0}
        className="w-10 h-10 flex items-center justify-center disabled:opacity-30"
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
                isLiked: likedArtworks.includes(currentArtwork.artworkId),
              }}
              size="large"
              borderRadius="small"
              theme="light"
              onClickLike={() => toggleLike(currentArtwork.artworkId)}
              onClick={() => {
                navigate(`/artworks/${currentArtwork.artworkId}`);
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
        className="w-10 h-10 flex items-center justify-center disabled:opacity-30"
      >
        <IconRightArrow />
      </button>
    </div>
  );
}
