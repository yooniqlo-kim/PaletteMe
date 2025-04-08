import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router";
import { ArtworkImage } from "./ArtworkImage";
import { ArtworkMeta } from "@/shared/components/artworks/ArtworkMeta";
import { DescriptionBox } from "./DescriptionBox";
import { AIDocentBox } from "./AIDocentBox";
import { CommentBox } from "./CommentBox";
import { WhiteContainer } from "@/shared/components/textbox/WhiteRoundedContainer";
import { ArtworkDetailData } from "@/shared/types/artwork";
import { BaseComment } from "@/shared/types/comment";

import IconButton from "@/shared/components/buttons/IconButton";
import IconBlackHeart from "@/shared/components/icons/IconBlackHeart";
import IconBookmark from "@/shared/components/icons/IconBookmark";
import FloatingButton from "./FloatingButton";

import {
  getAIDescription,
  likeArtwork,
  cancelLikeArtwork,
  bookmarkArtwork,
  cancelBookmarkArtwork,
} from "@/shared/api/artwork";
import { getComments } from "@/shared/api/comment";

type Props = {
  artwork: ArtworkDetailData;
};

export function ArtworkDetail({ artwork }: Props) {
  const isLoggedIn = Boolean(sessionStorage.getItem("user"));

  const navigate = useNavigate();

  // 작품 상태
  const [isLiked, setIsLiked] = useState(artwork.isLiked);
  const [likeCount, setLikeCount] = useState<number>(artwork.likeCount);
  const [isBookmarked, setIsBookmarked] = useState(artwork.isBookmarked);

  // 감상문 상태
  const [comments, setComments] = useState<BaseComment[]>([]);
  const [cursor, setCursor] = useState<number | undefined>(undefined);
  const [hasMore, setHasMore] = useState(true);
  const [loadingComments, setLoadingComments] = useState(false);

  const observerRef = useRef<HTMLDivElement | null>(null);

  const fetchComments = useCallback(async () => {
    if (!hasMore || loadingComments) return;
    setLoadingComments(true);

    try {
      const next = await getComments({
        artworkId: artwork.artworkId,
        cursor: cursor ?? undefined,
        size: 5,
      });

      if (next.length === 0) {
        setHasMore(false); // 다음 요청 막기
      } else {
        setComments((prev) => [...prev, ...next]);
        setCursor(Number(next[next.length - 1].commentId)); // 마지막 커서 갱신
      }
    } catch (error) {
      console.error("감상문 불러오기 실패:", error);
      setHasMore(false);
    } finally {
      setLoadingComments(false);
    }
  }, [artwork.artworkId, cursor, hasMore, loadingComments]);

  useEffect(() => {
    fetchComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!observerRef.current || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchComments();
        }
      },
      { threshold: 1 }
    );

    const el = observerRef.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, [comments, hasMore, fetchComments]);

  const handleToggleLike = async () => {
    const nextLiked = !isLiked;
    try {
      if (nextLiked) {
        await likeArtwork(artwork.artworkId);
        setLikeCount((count) => count + 1);
      } else {
        await cancelLikeArtwork(artwork.artworkId);
        setLikeCount((count) => count - 1);
      }
      setIsLiked(nextLiked);
    } catch (err) {
      console.error("좋아요 요청 실패:", err);
    }
  };

  const handleToggleBookmark = async () => {
    const nextBookmarked = !isBookmarked;
    try {
      if (nextBookmarked) {
        await bookmarkArtwork(artwork.artworkId);
      } else {
        await cancelBookmarkArtwork(artwork.artworkId);
      }
      setIsBookmarked(nextBookmarked);
    } catch (err) {
      console.error("북마크 요청 실패:", err);
    }
  };

  const handleLikeChange = (commentId: string, isLiked: boolean) => {
    setComments((prev) =>
      prev.map((comment) =>
        comment.commentId === commentId
          ? {
              ...comment,
              isLiked,
              likeCount: isLiked
                ? comment.likeCount + 1
                : comment.likeCount - 1,
            }
          : comment
      )
    );
  };

  const handleFloatingClick = () => {
    if (artwork.hasWrittenComment) {
      navigate(`/comments/${artwork.hasWrittenComment}`);
    } else {
      navigate(`/comments/write/${artwork.artworkId}`, { state: { artwork } });
    }
  };

  return (
    <div className="min-h-screen bg-neutral-100">
      {isLoggedIn && (
        <div className="relative mx-auto max-w-[412px]">
          <FloatingButton
            hasWrittenComment={artwork.hasWrittenComment}
            onClick={handleFloatingClick}
          />
        </div>
      )}

      <div className="pt-2 bg-neutral-200">
        <ArtworkImage artwork={artwork} />
      </div>
      <div className="flex flex-col gap-2">
        <WhiteContainer withTopRound withMarginTop>
          <div className="relative">
            {isLoggedIn && (
              <div className="absolute z-10 flex gap-2 -top-9 right-1">
                <IconButton identifier="heart" onClick={handleToggleLike}>
                  <span className="inline-flex items-center">{likeCount}</span>
                  <IconBlackHeart isClicked={isLiked} />
                </IconButton>
                <IconButton
                  identifier="bookmark"
                  onClick={handleToggleBookmark}
                >
                  <IconBookmark isClicked={isBookmarked} />
                </IconButton>
              </div>
            )}
            <ArtworkMeta artwork={artwork} showYear showLocation />
            <DescriptionBox description={artwork.description} />
          </div>
        </WhiteContainer>
        <WhiteContainer>
          <AIDocentBox
            onFetchExplanation={() => getAIDescription(artwork.artworkId)}
          />
        </WhiteContainer>
        <WhiteContainer>
          {isLoggedIn ? (
            <CommentBox
              comments={comments}
              onLikeChange={handleLikeChange}
              observerRef={observerRef}
              isLoading={loadingComments}
            />
          ) : (
            <p className="py-8 text-sm font-semibold text-center text-neutral-500">
              로그인 후 다른 이용자의 감상문을 확인해 보세요
            </p>
          )}

          {isLoggedIn && loadingComments && (
            <p className="py-2 text-sm text-center text-neutral-400">
              불러오는 중...
            </p>
          )}
          <div className="h-6" />
        </WhiteContainer>
      </div>
    </div>
  );
}
