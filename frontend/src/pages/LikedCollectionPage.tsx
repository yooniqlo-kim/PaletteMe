import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { PageIntro } from "@shared/components/collection/PageIntro";
import ArtworkListSection from "@shared/components/collection/ArtworkListSection";
import { ArtworkCard } from "@shared/components/artworks/ArtworkCard";
import { WriterMeta } from "@shared/components/comments/WriterMeta";
import { fetchLikedArtworks, LikedArtwork } from "@/shared/api/collection";

export default function LikedCollectionPage() {
  const navigate = useNavigate();

  const [artworks, setArtworks] = useState<LikedArtwork[]>([]);
  const [cursor, setCursor] = useState<number | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [firstImageUrl, setFirstImageUrl] = useState("/images/fallback.jpg");
  const observerRef = useRef<HTMLDivElement | null>(null);

  const user = JSON.parse(sessionStorage.getItem("user") || "{}");

  const handleClickArtwork = (artworkId: string): void => {
    navigate(`/artworks/${artworkId}`);
  };

  const loadMore = useCallback(async () => {
    try {
      const res = await fetchLikedArtworks(cursor);

      if (res.success) {
        const newData = res.data ?? [];

        setArtworks((prev) => [...prev, ...newData]);
        setCursor(newData[newData.length - 1]?.userArtworkLikeId ?? null);

        if (artworks.length === 0 && newData[0]?.imgUrl) {
          setFirstImageUrl(newData[0].imgUrl);
        }

        if (!newData.length) {
          setHasMore(false);
        }
      } else {
        setHasMore(false);
      }
    } catch (e) {
      console.error("좋아요한 작품 불러오기 실패:", e);
      setHasMore(false);
    }
  }, [cursor, artworks.length]);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting && hasMore) {
        loadMore();
      }
    },
    [hasMore, loadMore]
  );

  useEffect(() => {
    if (!observerRef.current) return;
    const observer = new IntersectionObserver(handleObserver, {
      threshold: 1.0,
    });
    observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [handleObserver]);

  return (
    <div className="bg-neutral-1 min-h-screen">
      <PageIntro imageUrl={firstImageUrl}>
        <div className="flex flex-col items-start justify-end h-full px-4 pb-6 text-white">
          <h1 className="font-bold" style={{ fontSize: "var(--text-xl)" }}>
            좋아요 컬렉션
          </h1>
          <WriterMeta user={user} />
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
                  artworkImageUrl: artwork.imgUrl ?? "",
                  isLiked: true,
                }}
                size="small"
                theme="light"
                borderRadius="small"
                onClick={() => handleClickArtwork(artwork.artworkId)}
              />
            );
          })}
          {hasMore && <div ref={observerRef} className="h-1" />}
          {!hasMore && artworks.length === 0 && (
            <div className="col-span-2 text-center text-sm text-gray-500">
              좋아요한 작품이 없습니다.
            </div>
          )}
        </div>
      </ArtworkListSection>
    </div>
  );
}
