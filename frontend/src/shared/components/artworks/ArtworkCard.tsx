import IconRedHeart from "@/shared/components/icons/IconRedHeart";
import IconRedHeartLarge from "@/shared/components/icons/IconRedHeartLarge";
import type { Artwork } from "@/shared/types/artwork";

// placeholder 이미지 import
import placeholderLight180 from "@/assets/images/placeholder-art-light-180x180.jpg";
import placeholderLight300 from "@/assets/images/placeholder-art-light-300x300.jpg";
import placeholderDark180 from "@/assets/images/placeholder-art-dark-180x180.jpg";
import placeholderDark300 from "@/assets/images/placeholder-art-dark-300x300.jpg";

type Props = {
  artwork: Artwork; // artwork 전체 객체로 받기
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
};

export const ArtworkCard = ({
  artwork,
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
}: Props) => {
  const {
    artworkImageUrl,
    title,
    liked = false,
  } = artwork;

  const dimension =
    size === "small"
      ? "w-[11.25rem] h-[11.25rem]"
      : "w-[18.75rem] h-[18.75rem]";

  const getPlaceholder = () => {
    if (theme === "dark") {
      return size === "small" ? placeholderDark180 : placeholderDark300;
    } else {
      return size === "small" ? placeholderLight180 : placeholderLight300;
    }
  };

  const placeholderImage = getPlaceholder();
  const safeImageUrl = artworkImageUrl?.trim() ? artworkImageUrl : placeholderImage;

  const overlayPositionClass =
    overlayTextPosition === "center"
      ? "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-lg"
      : "bottom-2 right-2";

  const borderRadiusValue =
    borderRadius === "small" ? "var(--radius-ps)" : "var(--radius-pm)";

  return (
    <div
      onClick={onClick}
      className={`relative ${dimension} overflow-hidden cursor-pointer ${
        hasBorder ? "border border-white" : ""
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
        className="w-full h-full object-cover"
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
          className="absolute bottom-2 right-2 z-10"
        >
          {size === "small" ? (
            <IconRedHeart isClicked={liked} />
          ) : (
            <IconRedHeartLarge isClicked={liked} />
          )}
        </button>
      )}
    </div>
  );
};
