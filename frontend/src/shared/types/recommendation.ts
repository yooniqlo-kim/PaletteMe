// 작품 요약 정보 (API)
export type RecommendedArtwork = {
  artworkId: string;
  title?: string;   
  artist?: string; 
  year?: string;
  description?: string;
  location?: string;
  imgUrl: string;
  isLiked?: boolean;
};

// API 응답 데이터 구조
export type RecommendationResponseData = {
  age: RecommendedArtwork[];
  favorite_artist: RecommendedArtwork[];
  similar_taste: RecommendedArtwork[];
  color: RecommendedArtwork[];
};

// 최종 API 응답 타입
export type RecommendationAPIResponse = {
  success: boolean;
  errorMsg: string | null;
  errorCode: string | null;
  data: RecommendationResponseData;
};
