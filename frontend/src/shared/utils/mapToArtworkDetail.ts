import { ArtworkDetailResponse } from "../types/api/artwork.response";
import { ArtworkDetailData } from "@/shared/types/artwork";

export const mapToArtworkDetail = (
  data: ArtworkDetailResponse,
  artworkId: string
): ArtworkDetailData => {
  return {
    artworkId, //url에서 직접 넣음
    title: data.title,
    artist: data.artist,
    artworkImageUrl: data.imgUrl ?? "",
    year: String(data.createdYear ?? ""),
    location: data.museumName,
    description: data.description,

    likeCount: data.like ?? 0,
    isLiked: false, // api 수정되면 고치기
    isBookmarked: false, // api 수정되면 고치기
    hasWrittenComment: null, // api 수정되면 고치기
  };
};
