export interface WeeklyReview {
  date: string;
  artworkId: string;
  imgUrl: string;
  reviewId: number;
}

export const weeklyDummy: WeeklyReview[] = [
  // ✅ 1주차 (3/30 ~ 4/5 중 일부)
  {
    date: "2025-03-31",
    artworkId: "The Starry Night_Vincent van Gogh",
    imgUrl: "https://upload.wikimedia.org/wikipedia/commons/d/d7/Meisje_met_de_parel.jpg",
    reviewId: 1,
  },
  {
    date: "2025-04-01",
    artworkId: "Mona Lisa_Leonardo da Vinci",
    imgUrl: "https://upload.wikimedia.org/wikipedia/commons/6/6a/Mona_Lisa.jpg",
    reviewId: 2,
  },

  // ✅ 2주차
  {
    date: "2025-04-07",
    artworkId: "The Scream_Edvard Munch",
    imgUrl: "https://upload.wikimedia.org/wikipedia/commons/f/f4/The_Scream.jpg",
    reviewId: 3,
  },
  {
    date: "2025-04-10",
    artworkId: "The Persistence of Memory_Salvador Dalí",
    imgUrl: "https://upload.wikimedia.org/wikipedia/en/d/dd/The_Persistence_of_Memory.jpg",
    reviewId: 4,
  },

  // ✅ 3주차
  {
    date: "2025-04-14",
    artworkId: "Girl with a Pearl Earring_Johannes Vermeer",
    imgUrl: "https://upload.wikimedia.org/wikipedia/commons/d/d7/Meisje_met_de_parel.jpg",
    reviewId: 5,
  },
  {
    date: "2025-04-18",
    artworkId: "The Kiss_Gustav Klimt",
    imgUrl: "https://upload.wikimedia.org/wikipedia/commons/7/7d/Gustav_Klimt_016.jpg",
    reviewId: 6,
  },
];
