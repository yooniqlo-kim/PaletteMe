interface IconProps {
  className?: string;
}

export default function IconLeftArrow({ className }: IconProps) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="42"
      viewBox="0 0 24 42"
      fill="none"
    >
      <path
        d="M21 3L3 21"
        stroke="#B0B0B0"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <path
        d="M21.2322 39.2324L3.23218 21.2324"
        stroke="#B0B0B0"
        strokeWidth="5"
        strokeLinecap="round"
      />
    </svg>
  );
}
