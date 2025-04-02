import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { ArtworkDetail } from "@/features/detail/ArtworkDetail";
// import { artworkDetailDummy } from "@/shared/dummy/artworkDummy";
import { commentDummy } from "@/shared/dummy/commentDummy";
import { getArtworkDetail } from "@/shared/api/artwork";
import { ArtworkDetailData } from "@/shared/types/artwork";

// export default function ArtworkPage() {
//   const { artworkId } = useParams<{ artworkId: string }>();
//   const artwork = artworkDetailDummy.find((a) => a.artworkId === artworkId);
//   const comments = commentDummy.filter((c) => c.artworkId === artworkId);
//   if (!artwork) {
//     return <div className="p-4">해당 작품을 찾을 수 없습니다.</div>;
//   }
//   return <ArtworkDetail artwork={artwork} comments={comments} />;
// }

export default function ArtworkPage() {
  const { artworkId } = useParams<{ artworkId: string }>();
  const [artwork, setArtwork] = useState<ArtworkDetailData | null>(null);

  useEffect(() => {
    if (artworkId) {
      getArtworkDetail(artworkId)
        .then(setArtwork)
        .catch((err) => {
          console.error("에러", err);
        });
    }
  }, [artworkId]);

  const comments = commentDummy.filter((c) => c.artworkId === artworkId);

  if (!artwork) {
    return <div className="p-4">작품 정보를 불러오는 중입니다...</div>;
  }

  return <ArtworkDetail artwork={artwork} comments={comments} />;
}
