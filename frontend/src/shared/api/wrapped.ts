export interface Recommendation {
    title: string;
    artist: string;
    imgUrl: string;
  }
  
  export interface WrappedData {
    favoriteArtist: {
      artist: string;
    };
    reviewRank: {
      myRank: number;
      topPercentage: number;
      reviewCount: number;
    };
    mostMemorableArtwork: {
      title: string;
      artist: string;
      imgUrl: string;
    };
    review_based_recommendations: Recommendation[];
  }
  