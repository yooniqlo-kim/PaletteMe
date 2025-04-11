import { api } from "./core";

// 공통 응답 타입
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

// 월간 감상문 조회 API
export const getMonthlyCalendarReviews = async (
  year: number,
  month: number
): Promise<ReviewData[]> => {
  const response = await api.get<GetReviewResponse>(`/mymuseum/reviews/monthly`, {
    params: { year, month },
  });

  if (!response.data.success || !response.data.data) {
    return [];
  }

  return response.data.data;
};

// 주간 감상문 조회 API
export const getWeeklyCalendarReviews = async (
  startDate: string, // YYYY-MM-DD
  endDate: string    // YYYY-MM-DD
): Promise<ReviewData[]> => {
  const response = await api.get<GetReviewResponse>(
    `/mymuseum/reviews/weekly`,
    {
      params: {
        startDate,
        endDate,
      },
    }
  );

  if (!response.data.success || !response.data.data) {
    return [];
  }

  return response.data.data;
};
