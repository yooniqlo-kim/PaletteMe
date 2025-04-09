import { useEffect, useState } from "react";
import { ArtworkCard } from "@/shared/components/artworks/ArtworkCard";
import ArtworkCardSkeleton from "@/shared/components/artworks/ArtworkCardSkeleton";
import type { BaseArtwork } from "@/shared/types/artwork";
import type { ArtworkSearchItem } from "@shared/api/search";

interface Props {
  artwork: ArtworkSearchItem & { isLiked?: boolean };
  onClick: () => void;
  onClickLike?: () => void;
  disabled?: boolean;
}

export default function SearchResultCard({
  artwork,
  onClick,
  onClickLike,
  disabled = false,
}: Props) {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    setImageLoaded(false);

    const img = new Image();
    img.src = artwork.imageUrl ?? "";

    img.onload = () => setImageLoaded(true);
    img.onerror = () => setImageLoaded(true); // ❗ 실패해도 로딩 완료 처리
  }, [artwork.imageUrl]);

  const fakeArtwork: BaseArtwork = {
    artworkId: artwork.artworkId,
    artworkImageUrl: artwork.imageUrl ?? "", // 실제 URL 전달
    title: artwork.enTitle ?? "",
    artist: artwork.enArtist ?? "",
  };

  return (
    <div className="relative w-full aspect-[1/1]">
      {!imageLoaded && (
        <div className="absolute inset-0 z-0">
          <ArtworkCardSkeleton size="small" />
        </div>
      )}
  
      <div
        className={`absolute inset-0 transition-opacity duration-300 ${
          imageLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <ArtworkCard
          artwork={fakeArtwork}
          isLiked={!!artwork.isLiked}
          size="small"
          borderRadius="small"
          theme="light"
          onClick={onClick}
          onClickLike={onClickLike}
          clickAction="navigate"
          disabled={disabled}
        />
      </div>
    </div>
  );
  
}
