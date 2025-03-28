import { Artwork } from "@/shared/types/artwork";

export type ArtworkImageProps = {
  artwork: Artwork;
  className?: string;
  linkToFullImage?: boolean; //원본 이미지 새 탭에서 열기 여부
};

export function ArtworkImage({
  artwork,
  className = "",
  linkToFullImage = true,
}: ArtworkImageProps) {
  const { artworkImageUrl, title } = artwork;

  const ImageContent = (
    <div
      className={`aspect-[23.75/22.375] rounded-pm bg-cover bg-no-repeat bg-center ${className}`}
      style={{ backgroundImage: `url(${artworkImageUrl})` }}
      aria-label={title}
    />
  );

  if (!linkToFullImage) {
    return <>{ImageContent}</>;
  }
  return (
    <a
      href={artworkImageUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="block w-full max-w-[380px] mx-auto"
      aria-label={title}
    >
      {ImageContent}
    </a>
  );
}
