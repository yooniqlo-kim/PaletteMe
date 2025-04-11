import { WrappedData } from "@/shared/types/api/wrapped";

export const WrappedDummy: WrappedData = {
  artistName: "René Magritte",
  favoriteArtwork: {
    title: "Woman with a Parasol",
    artist: "Claude Monet",
    imgUrl:
      "https://api.nga.gov/iiif/99758d9d-c10b-4d02-a198-7e49afb1f3a6/full/!200,200/0/default.jpg",
  },
  reviewRank: {
    myRank: 1,
    topPercentage: 90,
    reviewCount: 50,
  },
  mostMemorableArtwork: {
    title: "The persistence of Memory",
    artist: "Salvador Dali",
    imgUrl:
      "https://www.moma.org/media/W1siZiIsIjM4NjQ3MCJdLFsicCIsImNvbnZlcnQiLCItcmVzaXplIDEwMjR4MTAyNFx1MDAzZSJdXQ.jpg?sha=fedd8615f8cd03f3",
  },
  review_based_recommendations: [
    {
      title: "The persistence of Memory",
      artist: "Salvador Dali",
      imgUrl:
        "https://www.moma.org/media/W1siZiIsIjM4NjQ3MCJdLFsicCIsImNvbnZlcnQiLCItcmVzaXplIDEwMjR4MTAyNFx1MDAzZSJdXQ.jpg?sha=fedd8615f8cd03f3",
    },
  ],
};
