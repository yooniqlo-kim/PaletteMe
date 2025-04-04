export type RecommendationFilter =
  | "age"
  | "favorite_artist"
  | "similar_taste"
  | "color";

export interface RecommendedArtwork {
  artworkId: string;
  imgUrl: string;
  isLiked: boolean;
}

export interface RecommendationResponse {
  success: boolean;
  errorMsg: string | null;
  errorCode: string | null;
  data: Record<RecommendationFilter, RecommendedArtwork[]>;
}
