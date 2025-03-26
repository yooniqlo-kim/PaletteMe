import { useNavigate } from "react-router-dom";
import { ArtworkCard } from "@shared/components/artworks/ArtworkCard";

type Props = {
  images: string[];
};

export default function MyCollections({ images }: Props) {
  const navigate = useNavigate();

  const overlayTexts = ["좋아요 컬렉션", "북마크 컬렉션"];

  const handleNavigateToCollection = () => {
    navigate("/mymuseum/collections");
  };

  return (
    <div
      onClick={handleNavigateToCollection}
      className="w-full cursor-pointer"
    >
      <div className="grid grid-cols-2 gap-4 w-full max-w-[380px] mx-auto">
        {images.map((imageUrl, idx) => (
          <ArtworkCard
            key={idx}
            imageUrl={imageUrl}
            size="small"
            isDimmed
            overlayText={overlayTexts[idx]}
            overlayTextPosition="center"
            overlayTextSize="--text-md"
            borderRadius="small"
            hasBorder
          />
        ))}
      </div>
    </div>
  );
}

