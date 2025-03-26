type ChipProps = {
  text: string;
  className?: string; // 명시적으로 부모 컴포넌트에서 css 속성 조절 가능 (width는 글자 크기에 따라 적용)
};

export default function Chip({ text, className, ...props }: ChipProps) {
  return (
    <div
      className={`w-[58px] h-[22px] rounded-[50px] text-[12px] text-black font-normal border border-netural-3 flex justify-center items-center ${className} cursor-pointer`}
      {...props}>
      {text}
    </div>
  );
}
