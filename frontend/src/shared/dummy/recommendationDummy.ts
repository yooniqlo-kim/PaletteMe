import type { RecommendedArtwork } from "@/shared/api/recommendation";
import type { RecommendationFilter } from "@/shared/api/recommendation";

export const recommendationDummy: Record<RecommendationFilter, RecommendedArtwork[]> = {
  age: [
    {
      artworkId: "1",
      imgUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/800px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg",
      isLiked: true,
    },
    {
      artworkId: "2",
      imgUrl:
        "https://upload.wikimedia.org/wikipedia/en/d/db/Frida_Kahlo_%28self_portrait_dedicated_to_Dr_Eloesser%29.jpg",
      isLiked: false,
    },
  ],
  favorite_artist: [
    {
      artworkId: "3",
      imgUrl:
        "https://upload.wikimedia.org/wikipedia/commons/4/47/Vincent_Willem_van_Gogh_128.jpg",
      isLiked: false,
    },
    {
      artworkId: "4",
      imgUrl:
        "https://upload.wikimedia.org/wikipedia/commons/5/54/Vincent_van_Gogh_-_Terrasse_des_Caf%C3%A9s_an_der_Place_du_Forum_in_Arles_am_Abend1.jpeg",
      isLiked: true,
    },
  ],
  similar_taste: [
    {
      artworkId: "5",
      imgUrl:
        "https://upload.wikimedia.org/wikipedia/commons/4/4a/Gustav_Klimt_016.jpg",
      isLiked: false,
    },
    {
      artworkId: "6",
      imgUrl:
        "https://upload.wikimedia.org/wikipedia/en/7/74/PicassoGuernica.jpg",
      isLiked: true,
    },
  ],
  color: [
    {
      artworkId: "7",
      imgUrl:
        "https://upload.wikimedia.org/wikipedia/commons/7/75/Marc_Chagall%2C_1917%2C_Les_Amants_en_bleu.jpg",
      isLiked: true,
    },
    {
      artworkId: "8",
      imgUrl:
        "https://upload.wikimedia.org/wikipedia/en/f/f6/Matisse-Blue-Nude-II.jpg",
      isLiked: false,
    },
  ],
};
