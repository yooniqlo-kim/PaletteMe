import { ArtworkCard } from "@/shared/components/artworks/ArtworkCard";
import type { BaseArtwork } from "@/shared/types/artwork";
import type { ArtworkSearchItem } from "@shared/api/search";

interface Props {
  artwork: ArtworkSearchItem;
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
  const fakeArtwork: BaseArtwork & { isLiked?: boolean } = {
    artworkId: artwork.artworkId,
    artworkImageUrl: artwork.imageUrl ?? "",
    title: artwork.enTitle ?? "",
    artist: artwork.enArtist ?? "",
    isLiked: artwork.isLiked,
  };

  return (
    <ArtworkCard
      artwork={fakeArtwork}
      isLiked={artwork.isLiked}
      size="small"
      borderRadius="small"
      theme="light"
      onClick={onClick}
      onClickLike={onClickLike}
      clickAction="navigate"
      disabled={disabled}
    />
  );
}
