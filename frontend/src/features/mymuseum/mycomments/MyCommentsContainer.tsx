import { useNavigate } from "react-router-dom";
import { ArtworkCard } from "@shared/components/artworks/ArtworkCard";

type CommentPreview = {
  id: string;
  imageUrl: string;
  title?: string;
  artist?: string;
};

type Props = {
  images: CommentPreview[];
};

export default function MyComments({ images }: Props) {
  const navigate = useNavigate();

  const overlayTexts = ["내 감상문", "감상문 좋아요"];
  const navigatePaths = ["/comments/my", "/comments/liked"];

  return (
    <div className="w-full">
      <div className="grid grid-cols-2 gap-4 w-full max-w-[23.75rem] mx-auto">
        {images.map((item, idx) => (
          <ArtworkCard
            key={item.id}
            artwork={{
              artworkId: item.id,
              artworkImageUrl: item.imageUrl,
              title: item.title || "",
              artist: item.artist || "",
            }}
            size="small"
            isDimmed
            overlayText={overlayTexts[idx]}
            overlayTextPosition="center"
            overlayTextSize="--text-md"
            borderRadius="small"
            onClick={() => navigate(navigatePaths[idx])}
          />
        ))}
      </div>
    </div>
  );
}
