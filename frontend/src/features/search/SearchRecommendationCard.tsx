import { ArtworkCard } from "@/shared/components/artworks/ArtworkCard";

interface Props {
  imageUrl: string;
  overlayText: string;
  onClick: () => void;
}

export default function SearchRecommendationCard({
  imageUrl,
  overlayText,
  onClick,
}: Props) {
  return (
    <ArtworkCard
      imageUrl={imageUrl}
      overlayText={overlayText}
      overlayTextPosition="bottomRight"
      size="small"
      borderRadius="small"
      theme="dark"
      onClick={onClick}
    />
  );
}
