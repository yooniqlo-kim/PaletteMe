import {
  WrappedData,
  RawWrappedApiResponse,
  Recommendation,
} from '@shared/types/api/wrapped';

interface ExtendedRawWrappedApiResponse extends Partial<RawWrappedApiResponse> {
  recommendedArtwork2?: string;
  recommendedArtist2?: string;
  recommendedImg2?: string;

  favoriteName?: string;
  favoriteArtist?: string;
  favoriteImg?: string;

  reviewRank?: number;
  reviewPercentage?: number;
  reviewCnt?: number;
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
    artistName: apiData.artistName ?? '',
    favoriteArtwork: {
      title: apiData.favoriteName ?? '',
      artist: apiData.favoriteArtist ?? '',
      imgUrl: apiData.favoriteImg ?? '',
    },
    reviewRank: {
      myRank: apiData.reviewRank ?? 0,
      topPercentage: apiData.reviewPercentage ?? 0,
      reviewCount: apiData.reviewCnt ?? 0,
    },
    mostMemorableArtwork: {
      title: apiData.recommendedArtwork ?? '',  // ✅ 수정됨
      artist: apiData.recommendedArtist ?? '',
      imgUrl: apiData.recommendedImg ?? '',
    },
    review_based_recommendations: recommendations,
  };
}


