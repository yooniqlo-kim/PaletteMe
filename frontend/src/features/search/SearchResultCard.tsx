import { ArtworkCard } from "@/shared/components/artworks/ArtworkCard";
import type { Artwork } from "@/shared/types/artwork";
import { useNavigate } from "react-router-dom"; 

interface Props {
  imageUrl: string;
  artworkId: string;
  onClickLike?: () => void;
  isLiked?: boolean;
}

export default function SearchResultCard({
  imageUrl,
  artworkId,
  isLiked = false,
  onClickLike,
}: Props) {
  const navigate = useNavigate();

  // Artwork 객체 생성
  const fakeArtwork: Artwork = {
    artworkImageUrl: imageUrl,
    title: "", 
    liked: isLiked,
    artist: "", 
  };

  // 카드 클릭 시 상세 페이지로 이동
  const handleCardClick = () => {
    navigate(`/artwork/${artworkId}`);
  };

  return (
    <ArtworkCard
      artwork={fakeArtwork}
      size="small"
      borderRadius="small"
      theme="light"
      onClick={handleCardClick}
      onClickLike={onClickLike}
    />
  );
}
