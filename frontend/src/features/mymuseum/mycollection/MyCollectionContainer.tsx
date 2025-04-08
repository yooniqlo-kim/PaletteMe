import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArtworkCard } from "@shared/components/artworks/ArtworkCard";
import ArtworkCardSkeleton from "@shared/components/artworks/ArtworkCardSkeleton";
import type { RecommendedArtwork } from "@/shared/types/recommendation";

type Props = {
  images: RecommendedArtwork[];
};

export default function MyCollections({ images }: Props) {
  const navigate = useNavigate();

  const overlayTexts = ["좋아요 컬렉션", "북마크 컬렉션"];

  const [loadedImages, setLoadedImages] = useState<boolean[]>(
    Array(images.length).fill(false)
  );

  useEffect(() => {
    const loadImages = async () => {
      const updatedStates = await Promise.all(
        images.map((img) => {
          return new Promise<boolean>((resolve) => {
            const image = new Image();
            image.src = img.imgUrl;
            image.onload = () => resolve(true);
            image.onerror = () => resolve(true);
          });
        })
      );
      setLoadedImages(updatedStates);
    };

    loadImages();
  }, [images]);

  return (
    <div className="w-full">
      <div className="grid grid-cols-2 gap-4 w-full max-w-[23.75rem] mx-auto">
        {images.map((item, idx) => {
          const isLoaded = loadedImages[idx];

          return (
            <div key={item.artworkId} className="w-[180px]">
              {isLoaded ? (
                <ArtworkCard
                  artwork={{
                    artworkId: item.artworkId,
                    artworkImageUrl: item.imgUrl,
                    title: item.title ?? "제목 없음",
                    artist: item.artist ?? "작가 미상",
                  }}
                  isLiked={item.liked}
                  size="small"
                  isDimmed
                  overlayText={overlayTexts[idx]}
                  overlayTextPosition="center"
                  overlayTextSize="--text-md"
                  borderRadius="small"
                  onClick={() => {
                    const path = idx === 0 ? "/mymuseum/liked" : "/mymuseum/bookmark";
                    navigate(path);
                  }}
                />
              ) : (
                <ArtworkCardSkeleton size="small" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
