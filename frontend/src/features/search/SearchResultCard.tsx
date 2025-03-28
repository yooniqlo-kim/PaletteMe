import { ArtworkCard } from "@/shared/components/artworks/ArtworkCard";

interface Props {
  imageUrl: string;
  onClick: () => void;
  isLiked?: boolean;
  onClickLike?: () => void;
}

export default function SearchResultCard({
  imageUrl,
  onClick,
  isLiked = false,
  onClickLike,
}: Props) {
  return (
    <ArtworkCard
      imageUrl={imageUrl}
      size="small"
      borderRadius="small"
      theme="light"
      onClick={onClick}
      isLiked={isLiked}
      onClickLike={onClickLike}
    />
  );
}
