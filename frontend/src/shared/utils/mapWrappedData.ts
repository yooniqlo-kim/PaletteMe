import {
  WrappedData,
  RawWrappedApiResponse,
  Recommendation,
} from '@shared/api/wrapped';

interface ExtendedRawWrappedApiResponse extends RawWrappedApiResponse {
  recommendedArtwork2?: string;
  recommendedArtist2?: string;
  recommendedImg2?: string;
}

export function mapWrappedData(apiData: ExtendedRawWrappedApiResponse): WrappedData {
  const recommendations: Recommendation[] = [];

  if (
    apiData.recommendedArtwork &&
    apiData.recommendedArtist &&
    apiData.recommendedImg
  ) {
    recommendations.push({
      title: apiData.recommendedArtwork,
      artist: apiData.recommendedArtist,
      imgUrl: apiData.recommendedImg,
    });
  }

  if (
    apiData.recommendedArtwork2 &&
    apiData.recommendedArtist2 &&
    apiData.recommendedImg2
  ) {
    recommendations.push({
      title: apiData.recommendedArtwork2,
      artist: apiData.recommendedArtist2,
      imgUrl: apiData.recommendedImg2,
    });
  }

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
      title: apiData.favoriteName,
      artist: apiData.favoriteArtist,
      imgUrl: apiData.favoriteImg,
    },
    review_based_recommendations: recommendations,
  };
}
