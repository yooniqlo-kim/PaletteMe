import { useNavigate } from "react-router-dom";
import { PageIntro } from "@shared/components/collection/PageIntro";
import ArtworkListSection from "@shared/components/collection/ArtworkListSection";
import { ArtworkCard } from "@shared/components/artworks/ArtworkCard";

interface Props {
  query: string;
  data: {
    id: number;
    overlayText: string;
    imageUrl: string;
    isLiked: boolean;
  }[];
  onCardLike: (id: number) => void; // ✅ 상위에서 받아온 좋아요 함수
}

export default function SearchRecommendationResult({ query, data, onCardLike }: Props) {
  const navigate = useNavigate();
  const firstImageUrl = data[0]?.imageUrl || "/images/fallback.jpg";

  const handleClickArtwork = (artworkId: number): void => {
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
              key={artwork.id}
              artwork={{
                artworkId: String(artwork.id),
                title: artwork.overlayText,
                artist: "작가 미상",
                artworkImageUrl: artwork.imageUrl,
                isLiked: artwork.isLiked,
              }}
              size="small"
              theme="light"
              borderRadius="small"
              onClick={() => handleClickArtwork(artwork.id)}
              onClickLike={() => onCardLike(artwork.id)} // ✅ 상위에서 받은 함수로 연결
            />
          ))}
        </div>
      </ArtworkListSection>
    </div>
  );
}
