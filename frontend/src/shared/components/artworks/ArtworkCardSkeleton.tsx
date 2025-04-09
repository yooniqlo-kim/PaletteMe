type Props = {
    size?: "small" | "large";
    borderRadius?: "small" | "medium";
  };
  
  export default function ArtworkCardSkeleton({
    size = "small",
    borderRadius = "small",
  }: Props) {
    const dimensionClass =
      size === "small"
        ? "w-[180px] h-[180px]"
        : "w-full max-w-[260px] sm:max-w-[280px] md:max-w-[300px] aspect-[1/1] min-h-[260px]";
  
    const borderRadiusValue =
      borderRadius === "small" ? "var(--radius-ps)" : "var(--radius-pm)";
  
    return (
      <div
        className={`bg-neutral-4 animate-pulse ${dimensionClass}`}
        style={{ borderRadius: borderRadiusValue }}
      />
    );
  }
  