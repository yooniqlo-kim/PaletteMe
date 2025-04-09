// navBar 용 아이콘
export default function IconMuseum({ isActive }: { isActive: boolean }) {
  const color = isActive
    ? "var(--color-navbar-active)"
    : "var(--color-neutral-6)";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="28"
      viewBox="0 0 40 36"
      fill="none">
      <path
        d="M0 7.80469L19.3466 0L39.2622 7.80469V12.822H36.9861V31.7762H39.2622V35.6786H0V31.7762H2.27607V12.822H0V7.80469Z"
        fill={color}
      />
      <rect x="6" y="13" width="4" height="19" rx="1" fill="white" />
      <rect x="14" y="13" width="4" height="19" rx="1" fill="white" />
      <rect x="22" y="13" width="4" height="19" rx="1" fill="white" />
      <rect x="30" y="13" width="4" height="19" rx="1" fill="white" />
    </svg>
  );
}
