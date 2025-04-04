import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { BaseComment } from "@/shared/types/comment";
import { BaseArtwork } from "@/shared/types/artwork";
import { ArtworkImage } from "../detail/ArtworkImage";
import { ArtworkMeta } from "../../shared/components/artworks/ArtworkMeta";
import { WriterMeta } from "../../shared/components/comments/WriterMeta";
import IconButton from "@/shared/components/buttons/IconButton";
import IconThumb from "@/shared/components/icons/IconThumb";

export type CommentTicketProps = {
  comment: BaseComment;
  artwork: BaseArtwork;
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

  const toggleLike = async () => {
    const next = !isLiked;
    setIsLiked(next);
    setLikeCount((prev) => (next ? prev + 1 : prev - 1));
    onLikeChange?.(commentId, next);
  };
  useEffect(() => {
    setLikeCount(initialLikeCount);
    setIsLiked(initialIsLiked);
  }, [initialLikeCount, initialIsLiked, commentId]);

  const handleClick = () => {
    navigate(`/comment/${commentId}`);
  };
  return (
    <div
      className="w-full max-w-[17rem] h-[35rem] rounded-pm bg-white overflow-hidden flex flex-col cursor-pointer shadow-ticket"
      onClick={handleClick}
    >
      <div className="relative">
        <ArtworkImage artwork={artwork} />
        <div className="absolute bottom-2 right-2 px-2 py-1 flex items-center gap-1 text-xs font-semibold">
          <IconButton
            identifier="review_card"
            onClick={(e) => {
              e.stopPropagation();
              toggleLike();
            }}
          >
            <span className="inline-flex items-center">{likeCount}</span>
            <IconThumb isClicked={isLiked} />
          </IconButton>
        </div>
      </div>
      <div className="p-4 space-y-2">
        <ArtworkMeta artwork={artwork} showYear={false} showLocation={false} />
        <WriterMeta user={user} date={date} />
        <p className="text-xs leading-relaxed line-clamp-6">{content}</p>
      </div>
    </div>
  );
}
