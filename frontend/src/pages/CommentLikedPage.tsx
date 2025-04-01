import { commentDummy } from "@/shared/dummy/commentDummy";
import { baseArtworkDummy } from "@/shared/dummy/artworkDummy";
import { CommentCollectionLayout } from "@/features/comments/CommentCollectionLayout";

export default function CommentLikedPage() {
  const artworkMap = Object.fromEntries(
    baseArtworkDummy.map((artwork) => [artwork.artworkId, artwork])
  );

  return (
    <CommentCollectionLayout
      comments={commentDummy}
      artworks={artworkMap}
      title="좋아요"
    />
  );
}
