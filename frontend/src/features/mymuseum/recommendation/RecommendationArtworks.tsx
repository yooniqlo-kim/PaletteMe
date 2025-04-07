import { useState, useEffect } from "react";
import IconLeftArrow from "@/shared/components/icons/IconLeftArrow";
import IconRightArrow from "@/shared/components/icons/IconRightArrow";
import { ArtworkCard } from "@/shared/components/artworks/ArtworkCard";
import { useNavigate } from "react-router-dom";
import { likeArtwork, cancelLikeArtwork } from "@/shared/api/artwork";
import placeholderLight300 from "@/assets/images/placeholder-art-light-300x300.jpg";

import type { BaseArtwork } from "@shared/types/artwork";

type ExtendedArtwork = BaseArtwork & { isLiked?: boolean };

type Props = {
  artworks: ExtendedArtwork[];
  isLoading?: boolean;
};

export default function RecommendationArtworks({ artworks, isLoading }: Props) {
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

  useEffect(() => {
    artworks.forEach((artwork) => {
      if (artwork.artworkImageUrl) {
        const img = new Image();
        img.src = artwork.artworkImageUrl;
      }
    });
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
        <div className="w-full max-w-[260px] aspect-[1/1] min-h-[260px]">
        <ArtworkCard
          key={currentArtwork?.artworkId || "loading"}
          artwork={{
            artworkId: currentArtwork?.artworkId ?? "loading",
            title: currentArtwork?.title ?? "작품 불러오는 중...",
            artworkImageUrl: currentArtwork?.artworkImageUrl ?? placeholderLight300,
            artist: currentArtwork?.artist ?? "",
            year: currentArtwork?.year ?? "",
            isLiked: currentArtwork
              ? likedArtworks.includes(currentArtwork.artworkId)
              : false,
          }}
          size="large"
          borderRadius="small"
          theme="light"
          disabled={isLoading}
          onClickLike={() =>
            currentArtwork && toggleLike(currentArtwork.artworkId)
          }
          onClick={() => {
            if (currentArtwork) {
              navigate(`/artworks/${currentArtwork.artworkId}`);
            }
          }}
        />
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
