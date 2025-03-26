import IconButton from "@/shared/components/buttons/IconButton";

/**
 * [공통 컴포넌트] ArtworkCard
 *
 * 180x180 또는 300x300 크기의 정사각형 이미지 카드 컴포넌트.
 *
 * ✅ 사용 예시:
 * <ArtworkCard
 *   imageUrl="/images/example.jpg"
 *   size="large"
 *   showLikeButton
 *   isDimmed
 *   overlayText="인상주의"
 *   overlayTextPosition="bottomRight"
 *   borderRadius="small"
 *   hasBorder
 *   onClick={() => navigate("/artwork/1")}
 * />
 */

type Props = {
  imageUrl: string; // 이미지 URL
  size?: "small" | "large"; // 180x180 | 300x300
  showLikeButton?: boolean; // 좋아요 버튼
  isDimmed?: boolean; // 반투명 필터
  overlayText?: string; // 텍스트
  overlayTextPosition?: "center" | "bottomRight"; // 텍스트 위치
  overlayTextSize?: string; // 텍스트 크기
  borderRadius?: "small" | "medium"; // 8px | 12px
  hasBorder?: boolean; // 외곽선
  onClick?: () => void; // 클릭 이벤트
};

export const ArtworkCard = ({
  imageUrl,
  size = "small",
  showLikeButton = false,
  isDimmed = false,
  overlayText,
  overlayTextPosition = "center",
  overlayTextSize,
  borderRadius = "small",
  hasBorder = false,
  onClick,
}: Props) => {
  const dimension =
    size === "small" ? "w-[11.25rem] h-[11.25rem]" : "w-[18.75rem] h-[18.75rem]"; // 180px | 300px

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
        src={imageUrl}
        alt="Artwork"
        className="w-full h-full object-cover"
      />

      {isDimmed && (
        <div className="absolute inset-0 bg-black opacity-40" />
      )}

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

      {showLikeButton && (
        <div className="absolute top-2 right-2">
          <IconButton identifier="heart" />
        </div>
      )}
    </div>
  );
};
