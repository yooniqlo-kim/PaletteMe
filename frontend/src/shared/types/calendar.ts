// 날짜 기반으로 감상문 요약 정보
export interface WeeklyReview {
    date: string;         // YYYY-MM-DD
    artworkId: string;
    imgUrl: string;
    reviewId: number;
  }
  
  // 요일 UI에 쓰이는 데이터 형태
  export type CalendarDay = {
    date: string;         // YYYY-MM-DD
    artworkId?: string;
    imageUrl?: string;
    commentId?: string;   // 프론트 내부 식별용 (백엔드 -> reviewId / 프론트 -> commentId)
  };
  