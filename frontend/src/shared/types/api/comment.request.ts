//감상문 등록 요청
export interface ReviewsWriteRequest {
  artworkId?: string;
  content?: string;
  isPublic?: boolean;
}

// 감상문 수정 요청
export interface ReviewsEditRequest {
  content?: string;
  isPublic?: boolean;
}
