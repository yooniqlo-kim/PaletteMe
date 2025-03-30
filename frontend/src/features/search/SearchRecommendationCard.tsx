import { ArtworkCard } from "@/shared/components/artworks/ArtworkCard";
import type { Artwork } from "@/shared/types/artwork";

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
  const fakeArtwork: Artwork = {
    artworkImageUrl: imageUrl,
    title: overlayText,
    liked: false,
    artist: artistName,
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
