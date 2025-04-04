import { api } from "./core";
import { mapToBaseComment } from "../utils/mapToBaseComment";
import { BaseComment } from "@/shared/types/comment";
import {
  CommentSummaryResponse,
  CommentDetailResponse,
  PostCommentResponse,
} from "../types/api/comment.response";

// 작품 상세의 댓글 리스트
export const getComments = async ({
  artworkId,
  cursor,
  size = 5,
}: {
  artworkId: string;
  cursor?: number;
  size?: number;
}): Promise<BaseComment[]> => {
  const res = await api.get("/reviews", {
    params: {
      artworkId,
      cursor,
      size,
    },
  });

  const { success, data, errorMsg } = res.data;
  if (!success || !data) throw new Error(errorMsg ?? "감상문 조회 실패");

  const reviews: CommentSummaryResponse[] = data.reviews ?? [];

  return reviews
    .filter((r): r is CommentSummaryResponse => r !== null && r !== undefined)
    .map((r: CommentSummaryResponse) => mapToBaseComment(r, artworkId));
};

// 감상문 상세
export const getCommentDetail = async (
  commentId: string
): Promise<CommentDetailResponse> => {
  const res = await api.get(`/reviews/${commentId}`);
  const { success, data, errorMsg } = res.data;
  if (!success || !data) throw new Error(errorMsg ?? "감상문 상세 조회 실패");
  return data;
};

//감상문 등록
export const postComment = async ({
  artworkId,
  content,
  isPublic,
}: {
  artworkId: string;
  content: string;
  isPublic: boolean;
}): Promise<{ data: PostCommentResponse }> => {
  const res = await api.post("/reviews/write", {
    artworkId,
    content,
    isPublic,
  });

  return res.data;
};

// 감상문 좋아요
export const likeComment = async (commentId: string) => {
  const res = await api.post(`/reviews/${commentId}/like`);
  const { success, errorMsg } = res.data;
  if (!success) {
    throw new Error(errorMsg ?? "감상문 좋아요에 실패했습니다.");
  }
};

//감상문 좋아요 취소
export const cancelLikeComment = async (commentId: string) => {
  const res = await api.post(`/reviews/${commentId}/cancel`);
  const { success, errorMsg } = res.data;
  if (!success) {
    throw new Error(errorMsg ?? "감상문 좋아요 취소에 실패했습니다.");
  }
};
