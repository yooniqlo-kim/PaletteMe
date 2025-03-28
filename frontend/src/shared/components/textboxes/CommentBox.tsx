import { BaseComment } from "@/shared/types/comment";
import { CommentCard } from "../comments/CommentCard";

type CommentBoxProps = {
  comments: BaseComment[];
};

export function CommentBox({ comments }: CommentBoxProps) {
  if (comments.length === 0) return null;

  return (
    <div className="space-y-4">
      <p className="text-md font-semibold ">
        감상문
        <span className="text-neutral-400 font-medium px-2">
          {comments.length}
        </span>
      </p>
      {comments.map((comment) => (
        <CommentCard
          key={comment.commentId}
          comment={comment}
          variant="detail"
        />
      ))}
    </div>
  );
}
