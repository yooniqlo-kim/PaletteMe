import { useState } from "react";
import { likeArtwork, cancelLikeArtwork } from "@shared/api/artwork";

export function useToggleLike(initialLiked: string[] = []) {
  const [likedArtworks, setLikedArtworks] = useState<string[]>(initialLiked);
  const [loadingArtworkId, setLoadingArtworkId] = useState<string | null>(null);

  const toggleLike = async (artworkId: string) => {
    if (loadingArtworkId) return;

    const isLiked = likedArtworks.includes(artworkId);
    setLoadingArtworkId(artworkId);

    try {
      if (isLiked) {
        await cancelLikeArtwork(artworkId);
        setLikedArtworks((prev) => prev.filter((id) => id !== artworkId));
      } else {
        await likeArtwork(artworkId);
        setLikedArtworks((prev) => [...prev, artworkId]);
      }
    } catch (error) {
      console.error("좋아요 처리 중 오류:", error);
    } finally {
      setLoadingArtworkId(null);
    }
  };

  return {
    likedArtworks,
    toggleLike,
    loadingArtworkId,
    setLikedArtworks, // 선택 사용
  };
}
