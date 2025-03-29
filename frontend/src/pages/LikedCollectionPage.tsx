import { useNavigate } from "react-router-dom";
import { PageIntro } from "@shared/components/collection/PageIntro";
import ArtworkListSection from "@shared/components/collection/ArtworkListSection";
import { ArtworkCard } from "@shared/components/artworks/ArtworkCard";
import { collectionDummy } from "@shared/dummy/collectionDummy";
import { commentDummy } from "@/shared/dummy/commentDummy";
import { WriterMeta } from "@shared/components/comments/WriterMeta";

export default function LikedCollectionPage() {
  const firstImageUrl = collectionDummy[1]?.imageUrl || "https://cdn.safetimes.co.kr/news/photo/202106/96480_77112_1213.jpg";
  const firstUser = commentDummy[0].user;

  const navigate = useNavigate();
  const handleClickArtwork = (id: number) => {
    navigate(`/artworks/${id}`);
  };
  

  return (
    <div className="bg-neutral-1 min-h-screen">
      <PageIntro imageUrl={firstImageUrl}>
        <div className="flex flex-col items-start justify-end h-full px-4 pb-6 text-white">
          <h1
            className="font-bold"
            style={{ fontSize: "var(--text-xl)" }}
          >
            좋아요 컬렉션
          </h1>
          <WriterMeta user={firstUser} />
        </div>
      </PageIntro>

      <ArtworkListSection>
        <div className="grid grid-cols-2 gap-4">
          {collectionDummy.map((artwork) => (
            <ArtworkCard
              key={artwork.id}
              imageUrl={artwork.imageUrl}
              size="small"
              theme="light"
              borderRadius="small"
              onClick={() => handleClickArtwork(artwork.id)}
            />
          ))}
        </div>
      </ArtworkListSection>
    </div>
  );
}