import { useParams } from "react-router";
import { ArtworkDetail } from "@/features/detail/ArtworkDetail";
import { artworkDetailDummy } from "@/shared/dummy/artworkDummy";
import { commentDummy } from "@/shared/dummy/commentDummy";

export default function ArtworkPage() {
  const { artworkId } = useParams<{ artworkId: string }>();
  const artwork = artworkDetailDummy.find((a) => a.artworkId === artworkId);
  const comments = commentDummy.filter((c) => c.artworkId === artworkId);

  if (!artwork) {
    return <div className="p-4">해당 작품을 찾을 수 없습니다.</div>;
  }
  return <ArtworkDetail artwork={artwork} comments={comments} />;
}
