// navbar 아이콘
export default function IconCalendar({ isActive }: { isActive: boolean }) {
  let color = isActive
    ? "var(--color-navbar-active)"
    : "var(--color-neutral-6)";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
      viewBox="0 0 41 41"
      fill="none">
      <path
        d="M27.2783 3.3623V10.0869M13.9836 3.3623V10.0869M5.67439 16.8116H35.5874M8.99806 6.72462H32.2638C34.0994 6.72462 35.5874 8.22999 35.5874 10.0869V33.6232C35.5874 35.4801 34.0994 36.9855 32.2638 36.9855H8.99806C7.16245 36.9855 5.67439 35.4801 5.67439 33.6232V10.0869C5.67439 8.22999 7.16245 6.72462 8.99806 6.72462Z"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
