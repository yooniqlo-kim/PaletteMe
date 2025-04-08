import IconRedHeart from "@/shared/components/icons/IconRedHeart";
import IconRedHeartLarge from "@/shared/components/icons/IconRedHeartLarge";
import type { BaseArtwork } from "@/shared/types/artwork";

// placeholder 이미지 import
import placeholderLight180 from "@/assets/images/placeholder-art-light-180x180.jpg";
import placeholderLight300 from "@/assets/images/placeholder-art-light-300x300.jpg";
import placeholderDark180 from "@/assets/images/placeholder-art-dark-180x180.jpg";
import placeholderDark300 from "@/assets/images/placeholder-art-dark-300x300.jpg";

type Props = {
  artwork: BaseArtwork;
  isLiked?: boolean;
  size?: "small" | "large";
  theme?: "light" | "dark";
  isDimmed?: boolean;
  overlayText?: string;
  overlayTextPosition?: "center" | "bottomRight";
  overlayTextSize?: string;
  borderRadius?: "small" | "medium";
  hasBorder?: boolean;
  onClick?: () => void;
  onClickLike?: () => void;
  clickAction?: "navigate" | "like";
  disabled?: boolean;
};

export const ArtworkCard = ({
  artwork,
  isLiked = false,
  size = "small",
  theme = "light",
  isDimmed = false,
  overlayText,
  overlayTextPosition = "center",
  overlayTextSize,
  borderRadius = "small",
  hasBorder = false,
  onClick,
  onClickLike,
  clickAction = "navigate",
  disabled = false,
}: Props) => {
  const { artworkImageUrl, title } = artwork;

  let dimension = "";

  if (size === "small") {
    dimension = "w-full aspect-[1/1]";
  } else if (size === "large") {
    dimension = "w-full max-w-[260px] sm:max-w-[280px] md:max-w-[300px] aspect-[1/1]";
  }

  const getPlaceholder = () => {
    if (theme === "dark") {
      return size === "small" ? placeholderDark180 : placeholderDark300;
    } else {
      return size === "small" ? placeholderLight180 : placeholderLight300;
    }
  };

  const placeholderImage = getPlaceholder();
  const safeImageUrl = artworkImageUrl?.trim()
    ? artworkImageUrl
    : placeholderImage;

  const overlayPositionClass =
    overlayTextPosition === "center"
      ? "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-lg"
      : "bottom-2 right-2";

  const borderRadiusValue =
    borderRadius === "small" ? "var(--radius-ps)" : "var(--radius-pm)";

  const handleClick = () => {
    if (clickAction === "like" && onClickLike) {
      onClickLike();
    } else if (clickAction === "navigate" && onClick) {
      onClick();
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`relative ${dimension} overflow-hidden cursor-pointer ${
        hasBorder ? "border-5 border-white" : ""
      }`}
      style={{ borderRadius: borderRadiusValue }}
    >
      <img
        src={safeImageUrl}
        alt={title}
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          if (target.src !== placeholderImage) {
            target.src = placeholderImage;
          }
        }}
        className="w-full h-full object-cover aspect-[1/1]"
      />

      {isDimmed && <div className="absolute inset-0 bg-black opacity-40" />}

      {overlayText && (
        <div
          className={`absolute text-white font-bold whitespace-nowrap ${overlayPositionClass}`}
          style={{
            fontSize: `var(${overlayTextSize || "--text-sm"})`,
          }}
        >
          {overlayText}
        </div>
      )}

      {onClickLike && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            onClickLike();
          }}
          disabled={disabled}
          className="absolute bottom-2 right-2 z-10"
        >
          {size === "small" ? (
            <IconRedHeart isClicked={isLiked} />
          ) : (
            <IconRedHeartLarge isClicked={isLiked} />
          )}
        </button>
      )}
    </div>
  );
};
