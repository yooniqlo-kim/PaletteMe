import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { PageIntro } from "@shared/components/collection/PageIntro";
import ArtworkListSection from "@shared/components/collection/ArtworkListSection";
import { ArtworkCard } from "@shared/components/artworks/ArtworkCard";
import { WriterMeta } from "@shared/components/comments/WriterMeta";
import { fetchLikedArtworks, LikedArtwork } from "@/shared/api/collection";
import { BaseUser } from "@/shared/types/user";

export default function LikedCollectionPage() {
  const navigate = useNavigate();

  const [artworks, setArtworks] = useState<LikedArtwork[]>([]);
  const [cursor, setCursor] = useState<number | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [firstImageUrl, setFirstImageUrl] = useState("");
  const observerRef = useRef<HTMLDivElement | null>(null);

  // 세션에서 유저 가져오기
  const rawUser = JSON.parse(sessionStorage.getItem("user") || "{}");
  const user: BaseUser = {
    userId: rawUser.id,
    nickname: rawUser.nickname,
    profileImageUrl: rawUser.s3Url,
  };

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

        if (!artworks.length && user.profileImageUrl) {
          setFirstImageUrl(user.profileImageUrl);
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
  }, [cursor, artworks.length, user.profileImageUrl]);

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
        {artworks.length === 0 && !hasMore ? (
          <div className="flex justify-center items-center h-70 text-neutral-6 text-sm">
            좋아요한 작품이 없습니다.
          </div>
        ) : (
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
          </div>
        )}
      </ArtworkListSection>
    </div>
  );
}
