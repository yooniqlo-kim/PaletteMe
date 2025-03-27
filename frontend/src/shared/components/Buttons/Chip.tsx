type ChipProps = {
  text: string;
  className?: string; // 명시적으로 부모 컴포넌트에서 css 속성 조절 가능 (width는 글자 크기에 따라 적용)
  onClick?: () => void;
};

export default function Chip({ text, className, ...props }: ChipProps) {
  return (
    <div
      className={`text-black font-normal border flex justify-center items-center cursor-pointer ${className}`}
      {...props}
    >
      {text}
    </div>
  );
}
