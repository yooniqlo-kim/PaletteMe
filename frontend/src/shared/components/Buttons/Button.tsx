import { ComponentPropsWithoutRef } from "react";

// XL : 작품 상세 페이지 용
// X : 회원 가입용
// M : 로그인 용
// S : 키워드 추천 버튼
// XS : 회원 가입 페이지 작은 버튼
type SizeType = "XL" | "X" | "M" | "S" | "XS";

type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  size: SizeType;
};

export default function Button({ size, children, ...props }: ButtonProps) {
  let width;

  if (size === "XL") width = "w-[95%]";
  else if (size === "X") width = "w-[336px]";
  else if (size === "M") width = "w-[286px]";
  else if (size === "S") width = "w-[107px]";
  else if (size === "XS") width = "w-[68px]";

  return (
    <button
      className={`${width} bg-primary hover:bg-primary-hover rounded-sm text-white text-sm py-1 box-border cursor-pointer`}
      {...props}>
      {children}
    </button>
  );
}
