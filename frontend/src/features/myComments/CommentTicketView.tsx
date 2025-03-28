import { CommentTicket } from "./CommentTicket";
import { useState } from "react";
import { BaseComment } from "@/shared/types/comment";
import { Artwork } from "@/shared/types/artwork";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
        className="absolute left-1 top-1/2 -translate-y-1/2 z-10"
        onClick={goPrev}
        disabled={currentIndex === 0}
      >
        <ChevronLeft className="w-12 h-12 text-neutral-400" />
      </button>

      <CommentTicket
        comment={comment}
        artwork={artwork}
        onClick={onClickComment}
      />

      <button
        className="absolute right-1 top-1/2 -translate-y-1/2 z-10 "
        onClick={goNext}
        disabled={currentIndex === total - 1}
      >
        <ChevronRight className="w-12 h-12 text-neutral-400" />
      </button>
    </div>
  );
}
