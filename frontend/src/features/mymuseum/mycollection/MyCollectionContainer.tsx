import { useNavigate } from "react-router-dom";
import { ArtworkCard } from "@shared/components/artworks/ArtworkCard";

// 작품 정보 타입 정의
type Artwork = {
  id: number;
  image: string;
  title: string;
  artist: string;
  year: string;
  country: string;
};

type Props = {
  images: Artwork[];
};

export default function MyCollections({ images }: Props) {
  const navigate = useNavigate();

  const overlayTexts = ["좋아요 컬렉션", "북마크 컬렉션"];
  const paths = ["/mymuseum/collections/liked", "/mymuseum/collections/bookmark"];

  const handleNavigateToCollection = (idx: number) => {
    navigate(paths[idx]);
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-2 gap-4 w-full max-w-[23.75rem] mx-auto">
        {images.map((item, idx) => (
          <div
            key={item.id}
            className="cursor-pointer"
            onClick={() => handleNavigateToCollection(idx)}
          >
            <ArtworkCard
              imageUrl={item.image}
              size="small"
              isDimmed
              overlayText={overlayTexts[idx]}
              overlayTextPosition="center"
              overlayTextSize="--text-md"
              borderRadius="small"
              hasBorder
            />
          </div>
        ))}
      </div>
    </div>
  );
}
