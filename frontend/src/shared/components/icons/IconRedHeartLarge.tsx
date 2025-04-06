// 작품 리스트에 보이는 빨간색 하트 (300*300)
export default function IconRedHeartLarge({ isClicked }: { isClicked: boolean }) {
  const fillColor = isClicked
    ? "var(--color-navbar-active)"
    : "var(--color-neutral-3)";       

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="48"
      height="48"
      viewBox="0 0 27 28"
      fill="none"
    >
      <path
        d="M7.98022 3.81885C4.97318 3.81885 2.53467 6.36686 2.53467 9.51049C2.53467 12.0482 3.48764 18.0709 12.8681 24.1593C13.0362 24.2672 13.2291 24.3243 13.4258 24.3243C13.6225 24.3243 13.8154 24.2672 13.9834 24.1593C23.3639 18.0709 24.3169 12.0482 24.3169 9.51049C24.3169 6.36686 21.8783 3.81885 18.8713 3.81885C15.8643 3.81885 13.4258 7.26833 13.4258 7.26833C13.4258 7.26833 10.9872 3.81885 7.98022 3.81885Z"
        fill={fillColor}
        stroke="white"
        strokeWidth="1.15"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

