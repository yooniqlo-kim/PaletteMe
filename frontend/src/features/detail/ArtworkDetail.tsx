import { useState } from "react";
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

import { aiDocentResponses } from "@/shared/dummy/aiDocentRes";

type Props = {
  artwork: ArtworkDetailData;
  comments: BaseComment[];
};

export function ArtworkDetail({ artwork, comments }: Props) {
  const [isLiked, setIsLiked] = useState(artwork.isLiked);
  const [likeCount, setLikeCount] = useState<number>(artwork.likeCount);
  const [isBookmarked, setIsBookmarked] = useState(artwork.isBookmarked);
  const navigate = useNavigate();

  const handleToggleLike = () => {
    const nextLiked = !isLiked;
    setIsLiked(nextLiked);
    setLikeCount((count) => (nextLiked ? count + 1 : count - 1));
  };

  const handleToggleBookmark = () => {
    setIsBookmarked((prev) => !prev);
  };

  // 실제 api 요청이나 변경사항 추적 로직으로 교체
  const handleLikeChange = (commentId: string, isLiked: boolean) => {
    console.log(`감상문 ${commentId} 좋아요 상태 변경됨: ${isLiked}`);
  };

  const handleFloatingClick = () => {
    if (artwork.hasWrittenComment) {
      navigate(`/comment/${artwork.hasWrittenComment}`);
    } else {
      navigate(`/comment/write/${artwork.artworkId}`);
    }
  };

  return (
    <div className="bg-neutral-100 min-h-screen">
      <div className="relative mx-auto max-w-[412px]">
        <FloatingButton
          hasWrittenComment={artwork.hasWrittenComment}
          onClick={handleFloatingClick}
        />
      </div>

      <div className="bg-neutral-200 pt-2">
        <ArtworkImage artwork={artwork} />
      </div>
      <div className="flex flex-col gap-2">
        <WhiteContainer withTopRound withMarginTop>
          <div className="relative">
            <div className="absolute -top-9 right-1 flex gap-2 z-10">
              <IconButton identifier="heart" onClick={handleToggleLike}>
                <span className="inline-flex items-center">{likeCount}</span>
                <IconBlackHeart isClicked={isLiked} />
              </IconButton>
              <IconButton identifier="bookmark" onClick={handleToggleBookmark}>
                <IconBookmark isClicked={isBookmarked} />
              </IconButton>
            </div>
            <ArtworkMeta artwork={artwork} showYear showLocation />
            <DescriptionBox description={artwork.description} />
          </div>
        </WhiteContainer>
        <WhiteContainer>
          <AIDocentBox
            onFetchExplanation={() =>
              new Promise((resolve) =>
                setTimeout(() => {
                  resolve(
                    aiDocentResponses[artwork.artworkId] ??
                      "AI 응답이 없습니다."
                  );
                }, 1000)
              )
            }
          />
        </WhiteContainer>
        <WhiteContainer>
          <CommentBox comments={comments} onLikeChange={handleLikeChange} />
        </WhiteContainer>
      </div>
    </div>
  );
}
