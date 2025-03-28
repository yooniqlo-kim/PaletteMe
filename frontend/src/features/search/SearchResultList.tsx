import SearchResultCard from "./SearchResultCard";

interface Props {
  data: {
    id: number;
    imageUrl: string;
    overlayText: string;
    isLiked: boolean;
  }[];
  onCardClick: (id: number) => void;
  onCardLike: (id: number) => void;
  query?: string;
}

export default function SearchResultList({
  data,
  onCardClick,
  onCardLike,
  query,
}: Props) {
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
        <p className="text-sm text-gray-700 mb-2">
          <span className="text-[var(--color-primary)]">‘{query}’</span>
          에 대한 검색 결과
        </p>
      )}
      <div className="grid grid-cols-2 gap-4">
        {data.map((artwork) => (
          <SearchResultCard
            key={artwork.id}
            imageUrl={artwork.imageUrl}
            onClick={() => onCardClick(artwork.id)}
            isLiked={artwork.isLiked}
            onClickLike={() => onCardLike(artwork.id)}
          />
        ))}
      </div>
    </>
  );
}
