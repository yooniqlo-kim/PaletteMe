import { CommentTicket } from "./CommentTicket";
import { useState } from "react";
import { BaseComment } from "@/shared/types/comment";
import { Artwork } from "@/shared/types/artwork";
import IconLeftArrow from "@/shared/components/icons/IconLeftArrow";
import IconRightArrow from "@/shared/components/icons/IconRightArrow";

type CommentTicketViewProps = {
  comments: BaseComment[];
  artworks: Record<string, Artwork>; // artworkId -> artwork
  onClickComment?: (commentId: string) => void;
};

export function CommentTicketView({
  comments,
  artworks,
  onClickComment,
}: CommentTicketViewProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const total = comments.length;

  const goPrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const goNext = () => {
    setCurrentIndex((prev) => (prev < total - 1 ? prev + 1 : prev));
  };

  const comment = comments[currentIndex];
  const artwork = artworks[comment.artworkId];
  return (
    <div className="relative w-full flex flex-col items-center">
      <button
        className="absolute left-1 top-1/2 -translate-y-1/2 z-10 disabled:opacity-30 disabled:cursor-default"
        onClick={goPrev}
        disabled={currentIndex === 0}
      >
        <IconLeftArrow />
      </button>

      <CommentTicket
        comment={comment}
        artwork={artwork}
        onClick={onClickComment}
      />

      <button
        className="absolute right-1 top-1/2 -translate-y-1/2 z-10 disabled:opacity-30 disabled:cursor-default"
        onClick={goNext}
        disabled={currentIndex === total - 1}
      >
        <IconRightArrow />
      </button>
    </div>
  );
}
