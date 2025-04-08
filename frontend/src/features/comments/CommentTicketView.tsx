import { CommentTicket } from "./CommentTicket";
import { useState } from "react";
import { BaseComment } from "@/shared/types/comment";
import { BaseArtwork } from "@/shared/types/artwork";
import IconLeftArrow from "@/shared/components/icons/IconLeftArrow";
import IconRightArrow from "@/shared/components/icons/IconRightArrow";

type CommentTicketViewProps = {
  comments: BaseComment[];
  artworks: Record<string, BaseArtwork>;
  onLikeChange?: (commentId: string, isLiked: boolean) => void;
};

export function CommentTicketView({
  comments,
  artworks,
  onLikeChange,
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
    <div className="relative flex flex-col items-center w-full">
      <button
        className="absolute z-10 -translate-y-1/2 cursor-pointer left-3 top-1/2 disabled:opacity-30 disabled:cursor-default"
        onClick={goPrev}
        disabled={currentIndex === 0}
      >
        <IconLeftArrow />
      </button>

      <CommentTicket
        key={comment.commentId}
        comment={comment}
        artwork={artwork}
        onLikeChange={onLikeChange}
      />

      <button
        className="absolute z-10 -translate-y-1/2 cursor-pointer right-3 top-1/2 disabled:opacity-30 disabled:cursor-default"
        onClick={goNext}
        disabled={currentIndex === total - 1}
      >
        <IconRightArrow />
      </button>
    </div>
  );
}
