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
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      {data.map((artwork) => {
        const title = artwork.korTitle || artwork.originalTitle;
        return (
          <div key={artwork.artworkId} className="w-full max-w-[180px] mx-auto">
            <SearchRecommendationCard
              imageUrl={artwork.imageUrl ?? ""}
              overlayText={title}
              isLiked={artwork.isLiked}
              onClick={() => handleCardClick(title)}
            />
          </div>
        );
      })}
    </div>

  );
}

