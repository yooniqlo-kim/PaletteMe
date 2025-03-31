import { useState } from "react";
import { ArtworkImage } from "../detail/ArtworkImage";
import { ArtworkMeta } from "@/shared/components/artworks/ArtworkMeta";
import { WhiteContainer } from "@/shared/components/textbox/WhiteRoundedContainer";
import { DescriptionBox } from "../detail/DescriptionBox";
import IconButton from "@/shared/components/Buttons/IconButton";
import IconThreeDots from "@/shared/components/icons/IconThreeDots";
import DropdownMenu from "./CommentDropdown";
import IconThumb from "@/shared/components/icons/IconThumb";

import { artworkDummy } from "@/shared/dummy/artworkDummy";
import { commentDummy } from "@/shared/dummy/commentDummy";
import { WriterMeta } from "@/shared/components/comments/WriterMeta";

export function CommentDetail() {
  const [likeCount, setLikeCount] = useState<number>(commentDummy[0].likeCount);
  const [isLiked, setIsLiked] = useState(false); // 좋아요 상태 관리

  const toggleLike = () => {
    setIsLiked((prev) => !prev); // 좋아요 상태 토글
    setLikeCount((prev: number) => (isLiked ? prev - 1 : prev + 1));
  };

  return (
    <div className="bg-neutral-100 min-h-screen">
      <div className="bg-neutral-200 pt-2">
        <ArtworkImage artwork={artworkDummy} />
      </div>
      <div className="flex flex-col gap-2">
        <WhiteContainer withTopRound withMarginTop>
          <div className="relative">
            <div className="absolute -top-9 right-1 flex gap-2 z-10"></div>
            <ArtworkMeta artwork={artworkDummy} />
            <span className="flex items-center justify-between">
              <WriterMeta
                user={commentDummy[0].user}
                date={commentDummy[0].date}
              />
              <DropdownMenu
                button={
                  <button className="cursor-pointer flex justify-center items-center">
                    <IconThreeDots />
                  </button>
                }
                options={[
                  { label: "수정하기", onClick: () => console.log("수정") },
                  { label: "삭제하기", onClick: () => console.log("삭제") },
                ]}
              />
            </span>
            <DescriptionBox description={commentDummy[0].content} hideLine />
          </div>
          <IconButton identifier="review_detail" onClick={toggleLike}>
            <span className="inline-flex items-center">{likeCount}</span>
            <IconThumb isClicked={isLiked} />
          </IconButton>
        </WhiteContainer>
      </div>
    </div>
  );
}
