// 감상문 상세 보기 (작품 개괄 포함)
// 닉네임, 작품id, 감상문id 추가
export interface ReviewsWithArtworkResponse {
  reviewId?: string; //아직 없음
  artworkId?: string; //아직 없음
  title?: string;
  artist?: string;
  imgUrl?: string;
  museumName?: string;
  nickname?: string; //아직 없음
  userImg?: string;
  content?: string;
  createdAt?: string;
  reviewLike?: number;
  isLiked?: boolean;
  isPublic?: boolean;
}

// 감상문 리스트 조회
export interface ReviewListResponse {
  reviews?: ReviewListResponse[];
}

// 감상문 단건 조회
export interface ReviewSummaryResponse {
  reviewId?: number;
  artworkId?: string;
  nickname?: string;
  userImg?: string;
  createdAt?: string;
  content?: string;
  reviewLike?: number;
  isLiked?: boolean;
}

// 감상문 등록 확인
export interface ReviewWriteResponse {
  reviewId?: number;
  nickname?: string;
  userImg?: string;
  createdAt?: string;
  content?: string;
  reviewLike?: number;
  liked?: boolean;
}

// 감상문 수정 확인
export interface ReviewsEditResponse {
  content?: string;
  isPublic?: boolean;
  isLiked?: boolean;
}

// 좋아요 누른 감상문 리스트 조회
export type LikedReviewsListResponse = LikedOtherReviewsResponse[];

// 좋아요 누른 감상문 조회
// 유저 프사, (좋아요여부), 작품명, 작가, 작품이미지 필요
export interface LikedOtherReviewsResponse {
  nickname?: string;
  userImg?: string; // 아직 없음
  title?: string; // 아직 없음
  artist?: string; // 아직 없음
  imgUrl?: string; // 아직 없음
  reviewId?: number;
  likeCnt?: number;
  content?: string;
  createdAt?: string;
  artworkId?: string;
  artworkImageUrl?: string;
}

// 내가 작성한 감상문 리스트 조회
export type MyReviewsListResponse = MyReviewsListResponse[];

// 내가 작성한 감상문 조회
export interface MyReviewsResponse {
  reviewId?: number;
  likeCnt?: number;
  content?: string;
  createdAt?: string;
  artworkId?: string;
  originalTitle?: string;
  originalArtist?: string;
  imageUrl?: string;
  isLiked?: boolean;
}
