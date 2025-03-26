import { useNavigate } from "react-router-dom";
import { ArtworkCard } from "@shared/components/artworks/ArtworkCard";

type Props = {
  images: string[];
};

export default function MyComments({ images }: Props) {
  const navigate = useNavigate();

  const overlayTexts = ["내 감상문", "감상문 좋아요"];

  const handleNavigateToComments = () => {
    navigate("/mymuseum/comments");
  };

  return (
    <div
      onClick={handleNavigateToComments}
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
