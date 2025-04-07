import type { RecommendedArtwork } from "@/shared/api/recommendation";
import type { BaseArtwork } from "@/shared/types/artwork";

// 추천 작품을 실제 카드에서 사용하는 형태로 매핑
export function mapRecommendedToArtwork(
  item: RecommendedArtwork
): BaseArtwork & { isLiked?: boolean } {
  return {
    artworkId: item.artworkId,
    artworkImageUrl: item.imgUrl,
    title: "", // 서버에 없는 값은 일단 빈 문자열 처리
    artist: "",
    isLiked: item.liked ?? false
  };
}
