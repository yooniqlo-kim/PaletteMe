import SearchRecommendationCard from "./SearchRecommendationCard";

interface Props {
    data: { id: number; imageUrl: string; overlayText: string }[];
    onCardClick: (id: number) => void;
  }
  
  export default function SearchRecommendationList({ data, onCardClick }: Props) {
    return (
      <div className="grid grid-cols-2 gap-4">
        {data.map((artwork) => (
          <SearchRecommendationCard
            key={artwork.id}
            imageUrl={artwork.imageUrl}
            overlayText={artwork.overlayText}
            onClick={() => onCardClick(artwork.id)}
          />
        ))}
      </div>
    );
  }
  
