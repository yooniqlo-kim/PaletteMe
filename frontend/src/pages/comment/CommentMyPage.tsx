import { useEffect, useState, useRef, useCallback } from "react";
import { getMyReviews } from "@/shared/api/comment";
import { mapToMyCommentsAndArtworks } from "@/shared/utils/mapToBaseComment";

import { BaseComment } from "@/shared/types/comment";
import { ArtworkPreview } from "@/shared/types/artwork";
import { CommentCollectionLayout } from "@/features/comments/CommentCollectionLayout";

export default function CommentMyPage() {
  const [comments, setComments] = useState<BaseComment[]>([]);
  const [artworks, setArtworks] = useState<Record<string, ArtworkPreview>>({});
  const [cursor, setCursor] = useState<number | undefined>(undefined);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const observerRef = useRef<HTMLDivElement | null>(null);

  const fetch = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const res = await getMyReviews({ size: 10, cursor });
      const { comments: newComments, artworks: newArtworks } =
        mapToMyCommentsAndArtworks(res);

      setComments((prev) => [...prev, ...newComments]);
      setArtworks((prev) => ({
        ...prev,
        ...newArtworks,
      }));

      if (newComments.length === 0) {
        setHasMore(false);
      } else {
        const lastId = Number(newComments[newComments.length - 1].commentId);
        setCursor(lastId);
      }
    } catch (err) {
      console.error("내 감상문 조회 실패", err);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }, [cursor, loading, hasMore]);

  useEffect(() => {
    fetch();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetch();
        }
      },
      { threshold: 1.0 }
    );

    const el = observerRef.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, [fetch]);
  
  return (
    <>
      <CommentCollectionLayout
        comments={comments}
        artworks={artworks}
        title="나의 감상문"
      />
      <div ref={observerRef} className="w-full h-10" />
      {loading && (
        <p className="text-sm text-neutral-500 text-center py-2">
          불러오는 중...
        </p>
      )}
    </>
  );
}
