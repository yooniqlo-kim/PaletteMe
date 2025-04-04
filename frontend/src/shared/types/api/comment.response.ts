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

export interface CommentDetailResponse {
  reviewId: string;
  artworkId: string;
  title: string;
  artist: string;
  imgUrl: string;
  museumName: string;
  nickname: string;
  userImg: string;
  content: string;
  createdAt: string;
  reviewLike: number;
  isLiked: boolean;
}

export interface PostCommentResponse {
  reviewId: string;
  nickname: string;
  userImg: string;
  createdAt: string;
  content: string;
  reviewLike: number;
  liked: boolean;
}
