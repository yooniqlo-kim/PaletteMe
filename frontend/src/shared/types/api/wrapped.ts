export interface Recommendation {
  title: string;
  artist: string;
  imgUrl: string;
}

export interface WrappedData {
  artistName: string;
  favoriteArtwork: {
    title: string;   // favoriteName
    artist: string;  // favoriteArtist
    imgUrl: string;  // favoriteImg
  };
  reviewRank: {
    myRank: number;       // reviewRank
    topPercentage: number; // reviewPercentage
    reviewCount: number;   // reviewCnt
  };
  mostMemorableArtwork: {
    title: string;  // recommendedArtwork
    artist: string; // recommendedArtist
    imgUrl: string; // recommendedImg
  };
  review_based_recommendations?: Recommendation[]; // 만약 사용할 거면 optional로 남김
}

//API 응답을 위한 타입 정의
export interface RawWrappedApiResponse {
  artistName: string;
  reviewRank: number;
  reviewPercentage: number;
  reviewCnt: number;
  favoriteName: string;
  favoriteArtist: string;
  favoriteImg: string;
  recommendedArtwork: string;
  recommendedArtist: string;
  recommendedImg: string;
}
