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