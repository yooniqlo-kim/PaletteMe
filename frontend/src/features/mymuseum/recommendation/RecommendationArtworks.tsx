import IconLeftArrow from "@/shared/components/icons/IconLeftArrow";
import IconRightArrow from "@/shared/components/icons/IconRightArrow";
import { ArtworkCard } from "@/shared/components/artworks/ArtworkCard";
import type { Artwork } from "./RecommendationContainer";
import { useState, useEffect } from "react";

type Props = {
  artworks: Artwork[];
  onReachEnd?: () => void;
};

export default function RecommendationArtworks({ artworks, onReachEnd }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setCurrentIndex(0);
  }, [artworks]);
  
  const currentArtwork = artworks[currentIndex];

  const showPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const showNext = () => {
    const isLast = currentIndex === artworks.length - 1;

    if (!isLast) {
      setCurrentIndex((prev) => prev + 1);
    }

    if (isLast && onReachEnd) {
      onReachEnd(); // 마지막 작품일 때, 콜백 실행
    }
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
          key={currentArtwork.id}
          imageUrl={currentArtwork.imageUrl}
          size="large"
          borderRadius="small"
          theme="light"
          onClick={() => console.log(`작품 ${currentArtwork.id} 클릭됨`)}
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
