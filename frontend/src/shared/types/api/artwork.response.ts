export interface ArtworkDetailResponse {
  artworkId?: string;
  title: string;
  artist: string;
  imgUrl?: string;
  createdYear?: number;
  museumName?: string;
  description?: string;
  like?: number;
  isLiked: boolean;
  isBookMarked: boolean;
  myReviewId?: number | null;
}