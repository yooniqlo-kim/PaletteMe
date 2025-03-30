import { useNavigate } from "react-router-dom";
import SearchRecommendationCard from "./SearchRecommendationCard";

interface Props {
  data: { id: number; imageUrl: string; overlayText: string }[];
}

export default function SearchRecommendationList({ data }: Props) {
  const navigate = useNavigate();

  const handleCardClick = (title: string) => {
    navigate(`/search?query=${encodeURIComponent(title)}&from=recommendation`);
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      {data.map((artwork) => (
        <SearchRecommendationCard
          key={artwork.id}
          imageUrl={artwork.imageUrl}
          overlayText={artwork.overlayText}
          onClick={() => handleCardClick(artwork.overlayText)}
        />
      ))}
    </div>
  );
}
