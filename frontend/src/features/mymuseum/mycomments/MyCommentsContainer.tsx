import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArtworkCard } from "@shared/components/artworks/ArtworkCard";
import ArtworkCardSkeleton from "@shared/components/artworks/ArtworkCardSkeleton";

type CommentPreview = {
  id: string;
  imageUrl: string;
  title?: string;
  artist?: string;
};

type Props = {
  images: CommentPreview[];
};

export default function MyComments({ images }: Props) {
  const navigate = useNavigate();

  const overlayTexts = ["내 감상문", "감상문 좋아요"];

  const [loadedImages, setLoadedImages] = useState<boolean[]>(
    Array(images.length).fill(false)
  );

  useEffect(() => {
    const loadImages = async () => {
      const updatedStates = await Promise.all(
        images.map((img) => {
          return new Promise<boolean>((resolve) => {
            const image = new Image();
            image.src = img.imageUrl;
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
            <div key={item.id}>
              {isLoaded ? (
                <ArtworkCard
                  artwork={{
                    artworkId: item.id,
                    artworkImageUrl: item.imageUrl,
                    title: item.title ?? "제목 없음",
                    artist: item.artist ?? "작가 미상",
                  }}
                  size="small"
                  isDimmed
                  overlayText={overlayTexts[idx]}
                  overlayTextPosition="center"
                  overlayTextSize="--text-md"
                  borderRadius="small"
                  onClick={() => {
                    const path = idx === 0 ? "/comments/my" : "/comments/liked";
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
