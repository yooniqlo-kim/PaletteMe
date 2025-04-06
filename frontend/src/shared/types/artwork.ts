// 작품 정보
export type BaseArtwork = {
  artworkId: string;
  title: string;
  artist: string;
  artworkImageUrl: string;
  year?: string;
  location?: string;
  description?: string;
};

// 작품 상세용
export type ArtworkDetailData = BaseArtwork & {
  likeCount: number;
  isLiked: boolean;
  isBookmarked: boolean;
  hasWrittenComment: string | null;
};

// 감상문용
export type ArtworkPreview = {
  artworkId: string;
  title: string;
  artist: string;
  artworkImageUrl: string;
  location?: string;
  year?: string;
};