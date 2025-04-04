//감상문 등록 요청
export interface ReviewsWriteRequest {
  artworkId?: string;
  content?: string;
  isPublic?: boolean;
}
