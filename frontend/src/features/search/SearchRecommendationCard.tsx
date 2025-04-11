import { useState, useEffect } from "react";
import { ArtworkCard } from "@/shared/components/artworks/ArtworkCard";
import ArtworkCardSkeleton from "@/shared/components/artworks/ArtworkCardSkeleton"; // ✅ 추가
import type { BaseArtwork } from "@/shared/types/artwork";

interface Props {
  imageUrl: string;
  overlayText: string;
  artistName?: string;
  isLiked?: boolean;
  onClick: () => void;
}

export default function SearchRecommendationCard({
  imageUrl,
  overlayText,
  artistName = "",
  onClick,
}: Props) {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    setImageLoaded(false);
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => setImageLoaded(true);
  }, [imageUrl]);

  const fakeArtwork: BaseArtwork & { isLiked: boolean } = {
    artworkId: "fake-id",
    artworkImageUrl: imageUrl,
    title: overlayText,
    artist: artistName,
    isLiked: false,
  };

  return imageLoaded ? (
    <ArtworkCard
      artwork={fakeArtwork}
      isLiked={false}
      overlayText={overlayText}
      overlayTextPosition="bottomRight"
      size="small"
      borderRadius="small"
      theme="dark"
      onClick={onClick}
    />
  ) : (
    <ArtworkCardSkeleton size="small" />
  );
}
