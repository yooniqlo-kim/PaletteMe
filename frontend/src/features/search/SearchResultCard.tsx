import { ArtworkCard } from "@/shared/components/artworks/ArtworkCard";
import type { BaseArtwork } from "@/shared/types/artwork";
import { useNavigate } from "react-router-dom";

interface Props {
  imageUrl: string;
  artworkId: string;
  onClick: () => void;
  onClickLike?: () => void;
  isLiked?: boolean;
  disabled?: boolean;
}

export default function SearchResultCard({
  imageUrl,
  artworkId,
  isLiked = false,
  onClickLike,
  disabled = false,
}: Props) {
  const navigate = useNavigate();

  // Artwork 객체 생성
  const fakeArtwork: BaseArtwork & { isLiked?: boolean } = {
    artworkId: artworkId,
    artworkImageUrl: imageUrl,
    title: "",
    artist: "",
    isLiked: isLiked,
  };
  

  // 카드 클릭 시 상세 페이지로 이동
  const handleCardClick = () => {
    navigate(`/artworks/${artworkId}`);
  };

  return (
    <ArtworkCard
      artwork={fakeArtwork}
      size="small"
      borderRadius="small"
      theme="light"
      onClick={handleCardClick}
      onClickLike={onClickLike}
      disabled={disabled}
    />
  );
}
