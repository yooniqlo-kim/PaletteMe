import { api } from "@/shared/api/core";

// 좋아요한 작품 타입
export interface LikedArtwork {
  userArtworkLikeId: number;
  artworkId: string;
  imgUrl: string | null;
}

// 북마크한 작품 타입
export interface BookmarkArtwork {
  userArtworkBookmarkId: number;
  artworkId: string;
  imgUrl: string | null;
}

// 좋아요 컬렉션 조회
export const fetchLikedArtworks = async (
    cursor: number | null,
    size = 10
  ) => {
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

// 북마크 컬렉션 조회
export const fetchBookmarkedArtworks = async (
  cursor: number | null,
  size = 10
) => {
  const response = await api.get<{
    success: boolean;
    data: BookmarkArtwork[] | null;
    errorMsg: string | null;
    errorCode: string | null;
  }>("/mymuseum/artworks/bookmarked", {
    params: { cursor, size },
  });

  return response.data;
};
