import { api } from "./core";

// 작품 상세
export const getArtworkDetail = async (artworkId: string) => {
  const res = await api.get(`/artworks/${artworkId}`);
  const { success, data, errorMsg } = res.data;
  if (!success || !data) {
    throw new Error(errorMsg ?? "작품 정보 불러오기 실패");
  }
  return data;
};

//작품 ai 설명
export const getAIDescription = async (artworkId: string): Promise<string> => {
  const res = await api.get(`/artworks/${artworkId}/description`);
  const { success, data, errorMsg } = res.data;
  if (!success) {
    throw new Error(errorMsg ?? "작품 설명 불러오기 실패");
  }
  return data.description;
};


//작품 좋아요
export const likeArtwork = async (artworkId: string) => {
  const res = await api.post(`/artworks/artworks/${artworkId}/like`);
  const { success, errorMsg } = res.data;
  if (!success) {
    throw new Error(errorMsg ?? "작품 좋아요 실패");
  }
};

//작품 좋아요 취소
export const cancelLikeArtwork = async (artworkId: string) => {
  const res = await api.post(`/artworks/artworks/${artworkId}/cancel`);
  const { success, errorMsg } = res.data;
  if (!success) {
    throw new Error(errorMsg ?? "작품 좋아요 취소 실패");
  }
};

// 작품 북마크 등록
export const bookmarkArtwork = async (artworkId: string) => {
  const res = await api.post(`/artworks/artworks/${artworkId}/bookmark`);
  const { success, errorMsg } = res.data;
  if (!success) throw new Error(errorMsg ?? "작품 북마크 실패");
};

// 작품 북마크 취소
export const cancelBookmarkArtwork = async (artworkId: string) => {
  const res = await api.post(`/artworks/artworks/${artworkId}/bookmark/cancel`);
  const { success, errorMsg } = res.data;
  if (!success) throw new Error(errorMsg ?? "작품 북마크 취소 실패");
};
