import SearchResultCard from "./SearchResultCard";
import { ArtworkSearchItem } from "@shared/api/search";

interface Props {
  data: ArtworkSearchItem[];
  onCardClick: (id: string) => void;
  onCardLike: (id: string) => void;
  likedArtworks: string[];
  query?: string;
  isLoading?: boolean;
  error?: string | null;
}


export default function SearchResultList({
  data,
  onCardClick,
  onCardLike,
  likedArtworks,
  query,
  isLoading,
  error,
}: Props) {
  if (isLoading) {
    return (
      <p className="col-span-2 text-center text-gray-500 mt-10">
        검색 중입니다...
      </p>
    );
  }

  if (error) {
    return (
      <p className="col-span-2 text-center text-red-500 mt-10">
        {error}
      </p>
    );
  }

  if (data.length === 0) {
    return (
      <p className="col-span-2 text-center text-gray-500 mt-10">
        검색 결과가 없습니다.
      </p>
    );
  }

  return (
    <>
      {query && (
        <p className="text-[var(--color-neutral-8)] text-[var(--text-lg)] font-semibold font-pretendard mb-2">
          <span className="text-[var(--color-primary)]">‘{query}’</span>
          에 대한 검색 결과
        </p>
      )}
      <div className="grid grid-cols-2 gap-4">
        {data.map((artwork) => (
          <SearchResultCard
            key={artwork.artworkId}
            artworkId={artwork.artworkId}
            imageUrl={artwork.imageUrl ?? ""}
            onClick={() => onCardClick(artwork.artworkId)}
            isLiked={likedArtworks.includes(artwork.artworkId)}
            onClickLike={() => onCardLike(artwork.artworkId)}
          />
        ))}
      </div>
    </>
  );
}

