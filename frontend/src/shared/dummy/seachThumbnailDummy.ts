import { ArtworkSearchItem } from "@shared/api/search";

import recommended_search_thumbnail_monet from '@/assets/recommendations/recommended_search_thumbnail_monet.jpg';
import recommended_search_thumbnail_picaso from '@/assets/recommendations/recommended_search_thumbnail_picaso.jpg';
import recommended_search_thumbnail_manet from '@/assets/recommendations/recommended_search_thumbnail_manet.jpg';
import recommended_search_thumbnail_dali from '@/assets/recommendations/recommended_search_thumbnail_dali.jpg';
import recommended_search_thumbnail_goya from '@/assets/recommendations/recommended_search_thumbnail_goya.jpg';    
import recommended_search_thumbnail_matisse from '@/assets/recommendations/recommended_search_thumbnail_matisse.jpg';
import recommended_search_thumbnail_warhol from '@/assets/recommendations/recommended_search_thumbnail_warhol.jpg';
import recommended_search_thumbnail_degas from '@/assets/recommendations/recommended_search_thumbnail_degas.jpg';

export const searchDummy: ArtworkSearchItem[] = [
  {
    artworkId: "dummy_1",
    korTitle: "클로드 모네",
    originalTitle: "Claude Monet",
    enTitle: "Claude Monet",
    korArtist: "클로드 모네",
    originalArtist: "Claude Monet",
    enArtist: "Claude Monet",
    imageUrl: recommended_search_thumbnail_monet,
    score: 0,
    isLiked: false,
  },
  {
    artworkId: "dummy_2",
    korTitle: "파블로 피카소",
    originalTitle: "Pablo Picasso",
    enTitle: "Pablo Picasso",
    korArtist: "파블로 피카소",
    originalArtist: "Pablo Picasso",
    enArtist: "Pablo Picasso",
    imageUrl: recommended_search_thumbnail_picaso,
    score: 0,
    isLiked: false,
  },
  {
    artworkId: "dummy_3",
    korTitle: "에두아르 마네",
    originalTitle: "Édouard Manet",
    enTitle: "Édouard Manet",
    korArtist: "에두아르 마네",
    originalArtist: "Édouard Manet",
    enArtist: "Édouard Manet",
    imageUrl: recommended_search_thumbnail_manet,
    score: 0,
    isLiked: false,
  },
  {
    artworkId: "dummy_4",
    korTitle: "살바도르 달리",
    originalTitle: "살바도르 달리",
    enTitle: "Salvador Dalí", 
    korArtist: "살바도르 달리",
    originalArtist: "살바도르 달리", 
    enArtist: "Salvador Dalí",
    imageUrl: recommended_search_thumbnail_dali,
    score: 0,
    isLiked: false,
  },
  {
    artworkId: "dummy_5",
    korTitle: "프란시스코 고야",
    originalTitle: "Francisco Goya",
    enTitle: "Francisco Goya",
    korArtist: "프란시스코 고야",
    originalArtist: "Francisco Goya",
    enArtist: "Francisco Goya",
    imageUrl: recommended_search_thumbnail_goya,
    score: 0,
    isLiked: false,
  },
  {
    artworkId: "dummy_6",
    korTitle: "앙리 마티스",
    originalTitle: "Henri Matisse",
    enTitle: "Henri Matisse",
    korArtist: "앙리 마티스",
    originalArtist: "Henri Matisse",
    enArtist: "Henri Matisse",
    imageUrl: recommended_search_thumbnail_matisse,
    score: 0,
    isLiked: false,
  },
  {
    artworkId: "dummy_7",
    korTitle: "앤디 워홀",
    originalTitle: "Andy Warhol",
    enTitle: "Andy Warhol",
    korArtist: "앤디 워홀",
    originalArtist: "Andy Warhol",
    enArtist: "Andy Warhol",
    imageUrl: recommended_search_thumbnail_warhol,
    score: 0,
    isLiked: false,
  },
  {
    artworkId: "dummy_8",
    korTitle: "에드가 드가",
    originalTitle: "Edgar Degas",
    enTitle: "Edgar Degas",
    korArtist: "에드가 드가",
    originalArtist: "Edgar Degas",
    enArtist: "Edgar Degas",
    imageUrl: recommended_search_thumbnail_degas,
    score: 0,
    isLiked: false,
  },
];
