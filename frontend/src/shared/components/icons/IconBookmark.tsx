type IconBookmarkProps = {
  isClicked: boolean;
  className?: string;
};

export default function IconBookmark({
  isClicked,
  className,
}: IconBookmarkProps) {
  const color = isClicked ? "black" : "none";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="18"
      viewBox="0 0 14 18"
      fill={color}
      className={className}
    >
      <path
        d="M13 17L7 13.4444L1 17V2.77778C1 2.30628 1.18061 1.8541 1.5021 1.5207C1.82359 1.1873 2.25963 1 2.71429 1H11.2857C11.7404 1 12.1764 1.1873 12.4979 1.5207C12.8194 1.8541 13 2.30628 13 2.77778V17Z"
        fill={color}
        stroke="black"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
