import { useNavigate } from "react-router-dom";
import SearchRecommendationCard from "./SearchRecommendationCard";
import { ArtworkSearchItem } from "@shared/api/search";

interface Props {
  data: ArtworkSearchItem[];
}

export default function SearchRecommendationList({ data }: Props) {
  const navigate = useNavigate();

  const handleCardClick = (title: string) => {
    navigate(`/search?query=${encodeURIComponent(title)}&from=recommendation`);
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      {data.map((artwork) => {
        const title = artwork.korTitle || artwork.originalTitle;

        return (
          <SearchRecommendationCard
            key={artwork.artworkId}
            imageUrl={artwork.imageUrl ?? ""}
            overlayText={title}
            onClick={() => handleCardClick(title)}
          />
        );
      })}
    </div>
  );
}

