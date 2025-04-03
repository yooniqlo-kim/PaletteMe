import { api } from "@/shared/api/core";

// 좋아요한 작품 타입
export interface LikedArtwork {
  userArtworkLikeId: number;
  artworkId: string;
  imgUrl: string | null;
}

// 좋아요 컬렉션 조회 API
export const fetchLikedArtworks = async (cursor: number | null, size = 6) => {
  const response = await api.get<{
    success: boolean;
    data: LikedArtwork[] | null;
    errorMsg: string | null;
    errorCode: string | null;
  }>("/mymuseum/artworks/liked", {
    params: { cursor, size },
  });

  return response.data;
};
