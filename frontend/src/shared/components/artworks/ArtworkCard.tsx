import IconRedHeart from "@/shared/components/icons/IconRedHeart";
import IconRedHeartLarge from "@/shared/components/icons/IconRedHeartLarge";

// placeholder 이미지 import
import placeholderLight180 from "@/assets/images/placeholder-art-light-180x180.jpg";
import placeholderLight300 from "@/assets/images/placeholder-art-light-300x300.jpg";
import placeholderDark180 from "@/assets/images/placeholder-art-dark-180x180.jpg";
import placeholderDark300 from "@/assets/images/placeholder-art-dark-300x300.jpg";

type Props = {
  imageUrl: string; // 이미지 URL
  size?: "small" | "large"; // 180x180 | 300x300
  theme?: "light" | "dark"; // placeholder 선택용
  isDimmed?: boolean; // 반투명 필터
  overlayText?: string; // 텍스트
  overlayTextPosition?: "center" | "bottomRight"; // 텍스트 위치
  overlayTextSize?: string; // 텍스트 크기
  borderRadius?: "small" | "medium"; // 8px | 12px
  hasBorder?: boolean; // 외곽선
  onClick?: () => void; // 클릭 이벤트
  isLiked?: boolean; // 좋아요
  onClickLike?: () => void; // 좋아요 클릭 이벤트
};

export const ArtworkCard = ({
  imageUrl,
  size = "small",
  theme = "light",
  isDimmed = false,
  overlayText,
  overlayTextPosition = "center",
  overlayTextSize,
  borderRadius = "small",
  hasBorder = false,
  onClick,
  isLiked = false,
  onClickLike,
}: Props) => {
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
  const safeImageUrl = imageUrl?.trim() ? imageUrl : placeholderImage;

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
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          if (target.src !== placeholderImage) {
            target.src = placeholderImage;
          }
        }}
        alt="Artwork"
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
            <IconRedHeart isClicked={isLiked} />
          ) : (
            <IconRedHeartLarge isClicked={isLiked} />
          )}
        </button>
      )}
    </div>
  );
};
