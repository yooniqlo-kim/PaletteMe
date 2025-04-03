export interface CommentSummaryResponse {
  reviewId: string;
  artworkId?: string;
  nickname: string;
  userImg: string;
  content: string;
  createdAt: string;
  reviewLike: number;
  isLiked: boolean;
}

export interface CommentListResponse {
  reviews: CommentSummaryResponse[];
}
