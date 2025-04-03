export interface ArtworkDetailResponse {
  title: string;
  artist: string;
  imgUrl?: string;
  createdYear?: number;
  museumName?: string;
  description?: string;
  like?: number;
  //나중에 추가될 요소 수정 필요
}
