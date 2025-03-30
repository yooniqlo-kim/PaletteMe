export interface WeeklyReview {
  date: string;
  artworkId: string;
  imgUrl: string;
}

export const weeklyDummy: WeeklyReview[] = [
  {
    date: "2024-03-11",
    artworkId: "The Starry Night_Vincent van Gogh",
    imgUrl: "https://upload.wikimedia.org/wikipedia/commons/d/d7/Meisje_met_de_parel.jpg",
  },
  {
    date: "2024-03-12",
    artworkId: "The Scream_Edvard Munch",
    imgUrl: "https://upload.wikimedia.org/wikipedia/commons/f/f4/The_Scream.jpg",
  },
  {
    date: "2024-03-13",
    artworkId: "Mona Lisa_Leonardo da Vinci",
    imgUrl: "https://upload.wikimedia.org/wikipedia/commons/6/6a/Mona_Lisa.jpg",
  },
  {
    date: "2024-03-14",
    artworkId: "Girl with a Pearl Earring_Johannes Vermeer",
    imgUrl: "https://upload.wikimedia.org/wikipedia/commons/d/d7/Meisje_met_de_parel.jpg",
  },
  {
    date: "2024-03-15",
    artworkId: "The Kiss_Gustav Klimt",
    imgUrl: "https://upload.wikimedia.org/wikipedia/commons/d/d7/Meisje_met_de_parel.jpg",
  },
];
