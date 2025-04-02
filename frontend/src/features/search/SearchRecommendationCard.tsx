import { ArtworkCard } from "@/shared/components/artworks/ArtworkCard";
import type { BaseArtwork } from "@/shared/types/artwork";

interface Props {
  imageUrl: string;
  overlayText: string;
  artistName?: string;
  onClick: () => void;
}

export default function SearchRecommendationCard({
  imageUrl,
  overlayText,
  artistName = "",
  onClick,
}: Props) {
  const fakeArtwork: BaseArtwork & { isLiked: boolean } = {
    artworkId: "fake-id",
    artworkImageUrl: imageUrl,
    title: overlayText,
    artist: artistName,
    isLiked: false,
  };

  return (
    <ArtworkCard
      artwork={fakeArtwork}
      overlayText={overlayText}
      overlayTextPosition="bottomRight"
      size="small"
      borderRadius="small"
      theme="dark"
      onClick={onClick}
    />
  );
}
