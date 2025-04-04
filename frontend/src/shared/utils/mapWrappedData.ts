import { WrappedData, RawWrappedApiResponse } from "@shared/api/wrapped";

export function mapWrappedData(apiData: RawWrappedApiResponse): WrappedData {
  return {
    favoriteArtwork: {
      title: apiData.favoriteName,
      artist: apiData.favoriteArtist,
      imgUrl: apiData.favoriteImg,
    },
    reviewRank: {
      myRank: apiData.reviewRank,
      topPercentage: apiData.reviewPercentage,
      reviewCount: apiData.reviewCnt,
    },
    mostMemorableArtwork: {
      title: apiData.recommendedArtwork,
      artist: apiData.recommendedArtist,
      imgUrl: apiData.recommendedImg,
    },
  };
}
