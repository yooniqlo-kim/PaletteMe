// 전체 작품 상세 정보
export type Artwork = {
  artworkId?: string;
  title: string;
  artist: string;
  artworkImageUrl: string;
  year?: string;
  location?: string;
  description?: string;
  liked?: boolean;
};

// 추천 API 응답 타입 (작품 요약 정보)
export type RecommendedArtwork = {
  artworkId: string;
  title: string;
  artist: string;
  year?: string;
  description?: string;
  location?: string;
  imgUrl: string;
  liked?: boolean;
};

// 추천 API 전체 응답 구조
export type RecommendationResponseData = {
  age: RecommendedArtwork[];
  favorite_artist: RecommendedArtwork[];
  similar_taste: RecommendedArtwork[];
  color: RecommendedArtwork[];
};

export type RecommendationAPIResponse = {
  success: boolean;
  errorMsg: string | null;
  errorCode: string | null;
  data: RecommendationResponseData;
};

// 추천 작품 요약 → Artwork 상세 타입으로 변환
export function mapRecommendedToArtwork(item: RecommendedArtwork): Artwork {
  return {
    artworkId: item.artworkId,
    artworkImageUrl: item.imgUrl,
    liked: item.liked,
    title: item.title,
    artist: item.artist,
    year: item.year,
    location: item.location,
    description: item.description,
  };
}

