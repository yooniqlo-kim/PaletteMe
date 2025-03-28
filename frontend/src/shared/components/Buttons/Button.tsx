import { ComponentPropsWithoutRef } from "react";

// XL : 작품 상세 페이지 용
// X : 회원 가입용
// M : 로그인 용
// S : 키워드 추천 버튼
// XS : 회원 가입 페이지 작은 버튼
type SizeType = "XL" | "L" | "M" | "S" | "XS";

type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  size: SizeType;
  className?: string;
};

export default function Button({
  size,
  className,
  children,
  ...props
}: ButtonProps) {
  let style;

  if (size === "S") style = "w-[107px] h-[2.375rem]";
  else if (size === "XS") style = "!w-[68px] h-[40px]";

  return (
    <button
      className={`w-full h-12 bg-primary hover:bg-primary-hover font-semibold text-white rounded-ps py-1 box-border cursor-pointer ${style} ${className}`}
      {...props}>
      {children}
    </button>
  );
}
