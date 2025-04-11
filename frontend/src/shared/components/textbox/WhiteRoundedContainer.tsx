type WhiteContainerProps = {
  children: React.ReactNode;
  withTopRound?: boolean;
  withMarginTop?: boolean;
  className?: string;
};

export function WhiteContainer({
  children,
  withTopRound = false,
  withMarginTop = false,
  className = "",
}: WhiteContainerProps) {
  return (
    <div
      className={`
        bg-white px-5 py-5 relative z-10
        ${withTopRound ? "rounded-t-ps" : ""}
        ${withMarginTop ? "mt-[-0.5rem]" : "mt-0"}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
