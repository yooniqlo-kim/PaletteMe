import { api } from "./core";
import { mapToBaseComment } from "../utils/mapToBaseComment";
import { BaseComment } from "@/shared/types/comment";
import {
  ReviewsWithArtworkResponse,
  ReviewSummaryResponse,
  ReviewWriteResponse,
  ReviewsEditResponse,
  LikedOtherReviewsResponse,
  MyReviewsResponse,
} from "../types/api/comment.response";
import {
  ReviewsWriteRequest,
  ReviewsEditRequest,
} from "../types/api/comment.request";

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

  const reviews: ReviewSummaryResponse[] = data.reviews ?? [];

  return reviews
    .filter((r): r is ReviewSummaryResponse => r !== null && r !== undefined)
    .map((r: ReviewSummaryResponse) => mapToBaseComment(r, artworkId));
};

// 감상문 상세 조회
export const getCommentDetail = async (
  commentId: string
): Promise<ReviewsWithArtworkResponse> => {
  const res = await api.get(`/reviews/${commentId}`);
  const { success, data, errorMsg } = res.data;
  if (!success || !data) throw new Error(errorMsg ?? "감상문 상세 조회 실패");
  return data;
};

//감상문 등록
export const writeComment = async (
  body: ReviewsWriteRequest
): Promise<ReviewWriteResponse> => {
  const res = await api.post("/reviews/write", body);
  const { success, data, errorMsg } = res.data;

  if (!success || !data) {
    throw new Error(errorMsg ?? "감상문 등록 실패");
  }
  return data;
};

// 감상문 수정
export const editComment = async (
  commentId: string,
  body: ReviewsEditRequest
): Promise<ReviewsEditResponse> => {
  const res = await api.post(`/reviews/${commentId}/edit`, body);
  const { success, data, errorMsg } = res.data;
  if (!success || !data) throw new Error(errorMsg ?? "감상문 수정 실패");
  return data;
};

// 감상문 삭제
export const deleteComment = async (commentId: string): Promise<void> => {
  const res = await api.post(`/reviews/${commentId}/delete`);
  const { success, errorMsg } = res.data;
  if (!success) throw new Error(errorMsg ?? "감상문 삭제 실패");
};

// 감상문 좋아요
export const likeComment = async (commentId: string) => {
  const res = await api.post(`/reviews/${commentId}/like`);
  const { success, errorMsg } = res.data;
  if (!success) {
    throw new Error(errorMsg ?? "감상문 좋아요 실패");
  }
};

//감상문 좋아요 취소
export const cancelLikeComment = async (commentId: string) => {
  const res = await api.post(`/reviews/${commentId}/cancel`);
  const { success, errorMsg } = res.data;
  if (!success) {
    throw new Error(errorMsg ?? "감상문 좋아요 취소 실패");
  }
};

// 내가 작성한 감상문 리스트 조회
export const getMyReviews = async ({
  cursor,
  size,
}: {
  cursor?: number;
  size: number;
}): Promise<MyReviewsResponse[]> => {
  const params: { cursor?: number; size: number } = { size };
  if (cursor !== undefined) {
    params.cursor = cursor;
  }

  const res = await api.get("/mymuseum/reviews", { params });
  const { success, data, errorMsg } = res.data;

  if (!success || !data) {
    throw new Error(errorMsg ?? "내 리뷰 목록 조회 실패");
  }

  return data;
};

// 좋아요한 감상문 리스트 조회
export const getLikedReviews = async ({
  cursor,
  size,
}: {
  cursor?: number;
  size: number;
}): Promise<LikedOtherReviewsResponse[]> => {
  const params: { cursor?: number; size: number } = { size };
  if (cursor !== undefined) {
    params.cursor = cursor;
  }

  const res = await api.get("/mymuseum/reviews/liked", { params });
  const { success, data, errorMsg } = res.data;

  if (!success || !data) {
    throw new Error(errorMsg ?? "좋아요한 리뷰 조회 실패");
  }

  return data;
};
