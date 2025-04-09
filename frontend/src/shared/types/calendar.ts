// 주간 달력에 필요한 감상문 요약 정보 (프론트 전용 구조)
export interface WeeklyReview {
  date: string;         // YYYY-MM-DD
  reviewId: number;
  imgUrl: string;
}

// 주간 달력 렌더링에 사용되는 날짜 정보 구조
export type CalendarDay = {
  date: string;          // YYYY-MM-DD
  reviewId?: number;
  imgUrl?: string;
};
