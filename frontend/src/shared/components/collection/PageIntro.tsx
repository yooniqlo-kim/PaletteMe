// shared/components/collection/PageIntro.tsx

import { ReactNode } from "react";

interface PageIntroProps {
  title?: string;
  imageUrl: string;
  children?: ReactNode;
}

export function PageIntro({ imageUrl, children }: PageIntroProps) {
  return (
    <div
      className="relative w-full h-[300px] overflow-hidden"
      style={{
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* 어두운 오버레이 */}
      <div className="absolute inset-0 bg-black/30">{children}</div>
    </div>
  );
}
