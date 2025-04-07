import { useNavigate } from "react-router-dom";
import { ArtworkCard } from "@shared/components/artworks/ArtworkCard";
import type { RecommendedArtwork } from "@/shared/types/recommendation";

type Props = {
  images: RecommendedArtwork[];
};

export default function MyCollections({ images }: Props) {
  const navigate = useNavigate();

  const overlayTexts = ["좋아요 컬렉션", "북마크 컬렉션"];

  return (
    <div className="w-full">
      <div className="grid grid-cols-2 gap-4 w-full max-w-[23.75rem] mx-auto">
      {images.map((item, idx) => (
        <ArtworkCard
          key={item.artworkId}
          artwork={{
            artworkId: item.artworkId,
            artworkImageUrl: item.imgUrl,
            title: item.title ?? "제목 없음",
            artist: item.artist ?? "작가 미상",
            isLiked: item.isLiked, 
          }}
          size="small"
          isDimmed
          overlayText={overlayTexts[idx]}
          overlayTextPosition="center"
          overlayTextSize="--text-md"
          borderRadius="small"
          onClick={() => {
            const path = idx === 0 ? "/mymuseum/liked" : "/mymuseum/bookmark";
            navigate(path);
          }}
        />
      ))}
      </div>
    </div>
  );
}
