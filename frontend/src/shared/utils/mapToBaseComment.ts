import { CommentSummaryResponse } from "../types/api/comment.response";
import { BaseComment } from "@/shared/types/comment";

export const mapToBaseComment = (
  res: CommentSummaryResponse,
  artworkId: string
): BaseComment => ({
  commentId: String(res.reviewId),
  artworkId,
  content: res.content,
  date: res.createdAt,
  likeCount: res.reviewLike,
  isLiked: res.isLiked,
  user: {
    nickname: res.nickname,
    profileImageUrl: res.userImg,
  },
});
