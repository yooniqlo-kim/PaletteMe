import { BaseComment } from "@/shared/types/comment";
import { CommentCard } from "../../shared/components/comments/CommentCard";
import { RefObject } from "react";

type CommentBoxProps = {
  comments: BaseComment[];
  onLikeChange?: (commentId: string, isLiked: boolean) => void;
  observerRef?: RefObject<HTMLDivElement | null>;
  isLoading?: boolean;
};

export function CommentBox({
  comments,
  onLikeChange,
  observerRef,
  isLoading = false,
}: CommentBoxProps) {
  if (isLoading && comments.length === 0) {
    return (
      <div className="py-6 text-sm text-center text-neutral-500">
        감상문을 불러오는 중입니다...
      </div>
    );
  }
  if (!isLoading && comments.length === 0) {
    return (
      <div className="py-6 text-sm text-center text-neutral-500">
        아직 감상문이 없어요.
      </div>
    );
  }
  return (
    <div className="space-y-4">
      <p className="font-semibold text-md text-neutral-700">
        감상문
        <span className="px-2 font-medium text-neutral-400">
          {comments.length}
        </span>
      </p>
      {comments.map((comment, index) => {
        const isLast = index === comments.length - 1;
        return (
          <div key={comment.commentId} ref={isLast ? observerRef : null}>
            <CommentCard
              comment={comment}
              variant="detail"
              onLikeChange={onLikeChange}
            />
          </div>
        );
      })}
    </div>
  );
}
