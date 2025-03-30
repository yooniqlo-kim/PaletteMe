import type { RecommendedArtwork } from "@/shared/types/recommendation.ts";

export const recommendationDummy: Record<string, RecommendedArtwork[]> = {
  age: [
    {
      artworkId: "1",
      title: "별이 빛나는 밤",
      artist: "빈센트 반 고흐",
      year: "1889",
      imgUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/800px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg",
      liked: true,
    },
    {
      artworkId: "2",
      title: "기억",
      artist: "프리다 칼로",
      year: "1937",
      imgUrl: "https://upload.wikimedia.org/wikipedia/en/d/db/Frida_Kahlo_%28self_portrait_dedicated_to_Dr_Eloesser%29.jpg",
      liked: false,
    },
  ],
  favorite_artist: [
    {
      artworkId: "3",
      title: "해바라기",
      artist: "빈센트 반 고흐",
      year: "1888",
      imgUrl: "https://upload.wikimedia.org/wikipedia/commons/4/47/Vincent_Willem_van_Gogh_128.jpg",
      liked: false,
    },
    {
      artworkId: "4",
      title: "밤의 카페 테라스",
      artist: "빈센트 반 고흐",
      year: "1888",
      imgUrl: "https://upload.wikimedia.org/wikipedia/commons/5/54/Vincent_van_Gogh_-_Terrasse_des_Caf%C3%A9s_an_der_Place_du_Forum_in_Arles_am_Abend1.jpeg",
      liked: true,
    },
  ],
  similar_taste: [
    {
      artworkId: "5",
      title: "키스",
      artist: "구스타프 클림트",
      year: "1907",
      imgUrl: "https://upload.wikimedia.org/wikipedia/commons/4/4a/Gustav_Klimt_016.jpg",
      liked: false,
    },
    {
      artworkId: "6",
      title: "게르니카",
      artist: "파블로 피카소",
      year: "1937",
      imgUrl: "https://upload.wikimedia.org/wikipedia/en/7/74/PicassoGuernica.jpg",
      liked: true,
    },
  ],
  color: [
    {
      artworkId: "7",
      title: "빨간 풍선",
      artist: "마크 샤갈",
      year: "1950",
      imgUrl: "https://upload.wikimedia.org/wikipedia/commons/7/75/Marc_Chagall%2C_1917%2C_Les_Amants_en_bleu.jpg",
      liked: true,
    },
    {
      artworkId: "8",
      title: "푸른 누드",
      artist: "앙리 마티스",
      year: "1952",
      imgUrl: "https://upload.wikimedia.org/wikipedia/en/f/f6/Matisse-Blue-Nude-II.jpg",
      liked: false,
    },
  ],
};
