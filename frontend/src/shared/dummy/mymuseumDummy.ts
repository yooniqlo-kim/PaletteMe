// shared/dummy/recommendationArtworks.ts

export type Artwork = {
  id: number;
  imageUrl: string;
};

// 더미 추천 작품 데이터
export const mockArtworks: Record<string, Artwork[]> = {
  연령: [
    { id: 1, imageUrl: "https://cdn.safetimes.co.kr/news/photo/202106/96480_77112_1213.jpg" },
    { id: 2, imageUrl: "" },
  ],
  선호작가: [
    { id: 3, imageUrl: "https://cdn.safetimes.co.kr/news/photo/202106/96480_77112_1213.jpg" },
    { id: 4, imageUrl: "" },
  ],
  유사취향: [
    { id: 5, imageUrl: "https://cdn.safetimes.co.kr/news/photo/202106/96480_77112_1213.jpg" },
    { id: 6, imageUrl: "" },
  ],
  색깔: [
    { id: 7, imageUrl: "https://cdn.safetimes.co.kr/news/photo/202106/96480_77112_1213.jpg" },
    { id: 8, imageUrl: "" },
  ],
};
