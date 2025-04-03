import { api } from "./core";

// ✅ 백엔드 응답 타입
export interface ReviewData {
  reviewId: number;
  createdAt: string; // "2025-03-01T00:00:00"
  imgUrl: string;
}

export interface GetReviewResponse {
  success: boolean;
  errorMsg: string | null;
  errorCode: string | null;
  data: ReviewData[] | null;
}

// ✅ 날짜 기반 감상문 조회 API
export const getCalendarReviews = async (
  year: number,
  month: number
): Promise<ReviewData[]> => {
  const response = await api.get<GetReviewResponse>(`/mymuseum/reviews/dates`, {
    params: {
      year,
      month,
    },
  });

  if (!response.data.success || !response.data.data) {
    return []; // ← 실패했을 때 빈 배열 반환
  }

  return response.data.data;
};
