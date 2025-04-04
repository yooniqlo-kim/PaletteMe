import {
  CommentSummaryResponse,
  CommentDetailResponse,
  PostCommentResponse,
} from "../types/api/comment.response";
import { BaseComment } from "@/shared/types/comment";
import { formatDate } from "./date";
import { ArtworkDetailData } from "../types/artwork";

export const mapToBaseComment = (
  res: CommentSummaryResponse,
  artworkId: string
): BaseComment => ({
  commentId: String(res.reviewId),
  artworkId,
  content: res.content,
  date: formatDate(res.createdAt),
  likeCount: res.reviewLike,
  isLiked: res.isLiked,
  user: {
    nickname: res.nickname,
    profileImageUrl: res.userImg,
  },
});

export const mapToCommentAndArtwork = (
  res: CommentDetailResponse
): { comment: BaseComment; artwork: ArtworkDetailData } => {
  return {
    comment: {
      commentId: res.reviewId,
      artworkId: res.artworkId,
      content: res.content,
      date: formatDate(res.createdAt),
      likeCount: res.reviewLike,
      isLiked: res.isLiked,
      user: {
        nickname: res.nickname,
        profileImageUrl: res.userImg,
      },
    },
    artwork: {
      artworkId: res.artworkId,
      title: res.title,
      artist: res.artist,
      artworkImageUrl: res.imgUrl ?? "",
      year: "", // 이건 없으면 "" 처리하거나, 백엔드에서 넘겨주면 대응
      location: res.museumName,
      description: "", // 감상문 상세 응답에 없으면 빈 문자열
      likeCount: 0, // 필요 없으면 0 처리
      isLiked: false,
      isBookmarked: false,
      hasWrittenComment: res.reviewId,
    },
  };
};

export const mapToBaseCommentFromWriteResponse = (
  res: PostCommentResponse,
  artworkId: string
): BaseComment => {
  const rawUser = sessionStorage.getItem("user");
  const parsedUser = rawUser ? JSON.parse(rawUser) : null;

  return {
    commentId: String(res.reviewId),
    artworkId,
    content: res.content,
    date: formatDate(res.createdAt),
    likeCount: res.reviewLike,
    isLiked: res.liked,
    user: {
      nickname: parsedUser?.nickname ?? "익명",
      profileImageUrl: parsedUser?.s3Url ?? "",
    },
  };
};
