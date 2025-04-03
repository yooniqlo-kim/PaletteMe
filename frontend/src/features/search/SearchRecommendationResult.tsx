import { useNavigate } from "react-router-dom";
import { PageIntro } from "@shared/components/collection/PageIntro";
import ArtworkListSection from "@shared/components/collection/ArtworkListSection";
import { ArtworkCard } from "@shared/components/artworks/ArtworkCard";
import { ArtworkSearchItem } from "@shared/api/search";

interface Props {
  query: string;
  data: (ArtworkSearchItem & { isLiked: boolean })[];
  onCardLike: (id: string) => void;
}

export default function SearchRecommendationResult({ query, data, onCardLike }: Props) {
  const navigate = useNavigate();
  const firstImageUrl = data[0]?.imageUrl ?? "/images/fallback.jpg";

  const handleClickArtwork = (artworkId: string): void => {
    navigate(`/artwork/${artworkId}`);
  };

  return (
    <div className="min-h-screen">
      <PageIntro imageUrl={firstImageUrl}>
        <div className="flex flex-col items-start justify-end h-full px-4 pb-6 text-white">
          <h1 className="font-bold" style={{ fontSize: "var(--text-lg)" }}>
            ‘{query}’ 추천 작품
          </h1>
        </div>
      </PageIntro>

      <ArtworkListSection>
        <div className="grid grid-cols-2 gap-4 pb-[5rem]">
          {data.map((artwork) => (
            <ArtworkCard
              key={artwork.artworkId}
              artwork={{
                artworkId: artwork.artworkId,
                title: artwork.korTitle || artwork.originalTitle,
                artist: artwork.korArtist || artwork.originalArtist || "작가 미상",
                artworkImageUrl: artwork.imageUrl ?? "/images/fallback.jpg",
                isLiked: artwork.isLiked,
              }}
              size="small"
              theme="light"
              borderRadius="small"
              onClick={() => handleClickArtwork(artwork.artworkId)}
              onClickLike={() => onCardLike(artwork.artworkId)}
            />
          ))}
        </div>
      </ArtworkListSection>
    </div>
  );
}
