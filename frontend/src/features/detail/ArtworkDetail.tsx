import { useState } from "react";
import { ArtworkImage } from "./ArtworkImage";
import { ArtworkMeta } from "@/shared/components/artworks/ArtworkMeta";
import { DescriptionBox } from "./DescriptionBox";
import { AIDocentBox } from "./AIDocentBox";
import { CommentBox } from "./CommentBox";
import { WhiteContainer } from "@/shared/components/textbox/WhiteRoundedContainer";

import IconButton from "@/shared/components/Buttons/IconButton";
import IconBlackHeart from "@/shared/components/icons/IconBlackHeart";
import IconBookmark from "@/shared/components/icons/IconBookmark";

import FloatingButton from "./FloatingButton";

import { artworkDummy } from "@/shared/dummy/artworkDummy";
import { commentDummy } from "@/shared/dummy/commentDummy";
import { aiDocentResponses } from "@/shared/dummy/aiDocentRes";

export function ArtworkDetail() {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState<number>(223);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const hasWrittenComment = true;

  const handleToggleLike = () => {
    setIsLiked((prev) => !prev);
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  const handleToggleBookmark = () => {
    setIsBookmarked((prev) => !prev);
  };

  return (
    <div className="bg-neutral-100 min-h-screen">
      <div className="relative mx-auto max-w-[412px]">
        <FloatingButton
          hasWrittenComment={hasWrittenComment}
          onClick={() => {
            if (hasWrittenComment) {
              console.log("감상문 보기");
            } else {
              console.log("감상문 쓰기");
            }
          }}
        />
      </div>

      <div className="bg-neutral-200 pt-2">
        <ArtworkImage artwork={artworkDummy} />
      </div>
      <div className="flex flex-col gap-2">
        <WhiteContainer withTopRound withMarginTop>
          <div className="relative">
            <div className="absolute -top-9 right-4 flex gap-2 z-10">
              <IconButton identifier="heart" onClick={handleToggleLike}>
                <span className="inline-flex items-center">{likeCount}</span>
                <IconBlackHeart isClicked={isLiked} />
              </IconButton>
              <IconButton identifier="bookmark" onClick={handleToggleBookmark}>
                <IconBookmark isClicked={isBookmarked} />
              </IconButton>
            </div>

            <ArtworkMeta artwork={artworkDummy} showYear showLocation />
            <DescriptionBox description={artworkDummy.description} />
          </div>
        </WhiteContainer>
        <WhiteContainer>
          <AIDocentBox
            onFetchExplanation={() =>
              new Promise((res) =>
                setTimeout(() => res(aiDocentResponses["1"]), 1500)
              )
            }
          />
        </WhiteContainer>
        <WhiteContainer>
          <CommentBox comments={commentDummy} />
        </WhiteContainer>
      </div>
    </div>
  );
}
