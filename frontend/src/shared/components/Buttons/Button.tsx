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
  let style;

  if (size === "XL") style = "w-[380px]";
  else if (size === "X") style = "w-[336px]";
  else if (size === "M") style = "w-[286px]";
  else if (size === "S") style = "w-[107px]";
  else if (size === "XS") style = "w-[68px] h-[40px]";

  return (
    <button
      className={`h-12 bg-primary hover:bg-primary-hover font-semibold text-white rounded-ps py-1 box-border cursor-pointer ${style}`}
      {...props}>
      {children}
    </button>
  );
}
