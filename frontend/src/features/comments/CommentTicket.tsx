import { useState } from "react";
import { useNavigate } from "react-router";
import { BaseComment } from "@/shared/types/comment";
import { BaseArtwork } from "@/shared/types/artwork";
import { ArtworkImage } from "../detail/ArtworkImage";
import { ArtworkMeta } from "../../shared/components/artworks/ArtworkMeta";
import { WriterMeta } from "../../shared/components/comments/WriterMeta";
import { likeComment, cancelLikeComment } from "@/shared/api/comment";

import IconButton from "@/shared/components/buttons/IconButton";
import IconThumb from "@/shared/components/icons/IconThumb";

export type CommentTicketProps = {
  comment: BaseComment;
  artwork?: BaseArtwork;
  onLikeChange?: (commentId: string, isLiked: boolean) => void;
};

export function CommentTicket({
  comment,
  artwork,
  onLikeChange,
}: CommentTicketProps) {
  const {
    commentId,
    user,
    date,
    content,
    likeCount: initialLikeCount,
    isLiked: initialIsLiked,
  } = comment;

  const [likeCount, setLikeCount] = useState<number>(initialLikeCount);
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const navigate = useNavigate();

  if (!artwork) {
    return null;
  }

  const toggleLike = async () => {
    const next = !isLiked;

    // 먼저 UI 상태 변경
    setIsLiked(next);
    setLikeCount((prev) => (next ? prev + 1 : prev - 1));
    onLikeChange?.(commentId, next);

    try {
      if (next) {
        await likeComment(commentId);
      } else {
        await cancelLikeComment(commentId);
      }
    } catch (error) {
      console.error("좋아요 처리 실패", error);
      setIsLiked(!next);
      setLikeCount((prev) => (!next ? prev + 1 : prev - 1));
      onLikeChange?.(commentId, !next);
    }
  };

  const handleClick = () => {
    navigate(`/comments/${commentId}`);
  };

  return (
    <div
      className="w-full max-w-[17rem] h-[35rem] rounded-pm bg-white overflow-hidden flex flex-col cursor-pointer
             shadow-md transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl"
      onClick={handleClick}
    >
      <div className="relative">
        <ArtworkImage artwork={artwork} />
        <div className="absolute flex items-center gap-1 px-2 py-1 text-xs font-semibold bottom-2 right-2">
          <IconButton
            identifier="review_card"
            onClick={(e) => {
              e.stopPropagation();
              toggleLike();
            }}
          >
            <span className="relative top-[2px]">{likeCount}</span>
            <IconThumb isClicked={isLiked} />
          </IconButton>
        </div>
      </div>
      <div className="p-4 space-y-2">
        <ArtworkMeta artwork={artwork} showYear={false} showLocation={false} />
        <WriterMeta user={user} date={date} visibility={comment.visibility} />
        <p className="text-xs leading-relaxed line-clamp-6">{content}</p>
      </div>
    </div>
  );
}
