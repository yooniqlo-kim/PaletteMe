import { useNavigate } from "react-router-dom";
import { PageIntro } from "@shared/components/collection/PageIntro";
import ArtworkListSection from "@shared/components/collection/ArtworkListSection";
import { ArtworkCard } from "@shared/components/artworks/ArtworkCard";
import { collectionDummy } from "@shared/dummy/collectionDummy";
import { commentDummy } from "@/shared/dummy/commentDummy";
import { WriterMeta } from "@shared/components/comments/WriterMeta";

export default function BookmarkCollectionPage() {
  const navigate = useNavigate();

  const artworks = collectionDummy.data.liked_artworks;

  const firstImageUrl = artworks[0]?.imgUrl || "/images/fallback.jpg";
  const firstUser = commentDummy[0].user;

  const handleClickArtwork = (artworkId: string): void => {
    navigate(`/artworks/${artworkId}`);
  };

  return (
    <div className="bg-neutral-1 min-h-screen">
      <PageIntro imageUrl={firstImageUrl}>
        <div className="flex flex-col items-start justify-end h-full px-4 pb-6 text-white">
          <h1
            className="font-bold"
            style={{ fontSize: "var(--text-xl)" }}
          >
            북마크 컬렉션
          </h1>
          <WriterMeta user={firstUser} />
        </div>
      </PageIntro>

      <ArtworkListSection>
        <div className="grid grid-cols-2 gap-4">
          {artworks.map((artwork) => {
            const [title, artist] = artwork.artworkId.split("_");

            return (
              <ArtworkCard
                key={artwork.artworkId}
                artwork={{
                  artworkId: artwork.artworkId,
                  title,
                  artist,
                  artworkImageUrl: artwork.imgUrl,
                  liked: true,
                }}
                size="small"
                theme="light"
                borderRadius="small"
                onClick={() => handleClickArtwork(artwork.artworkId)}
              />
            );
          })}
        </div>
      </ArtworkListSection>
    </div>
  );
}
