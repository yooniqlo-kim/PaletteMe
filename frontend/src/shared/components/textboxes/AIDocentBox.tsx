import { useState } from "react";

type AIDocentBoxProps = {
  onFetchExplanation: () => Promise<string>;
};

export function AIDocentBox({ onFetchExplanation }: AIDocentBoxProps) {
  const [loading, setLoading] = useState(false);
  const [aiText, setAiText] = useState<string | null>(null);

  const handleClick = async () => {
    if (loading || aiText) return; // 중복 방지
    setLoading(true);
    try {
      const text = await onFetchExplanation();
      setAiText(text);
    } finally {
      setLoading(false);
    }
  };
  const isInitial = !aiText;

  const balloonBase = `
    px-4 py-2 rounded-ps
    text-xs whitespace-pre-line transition-all duration-500 ease-in-out
    inline-block max-w-[80%] text-left
  `;

  const balloonColor = loading
    ? "bg-primary/60 text-white font-semibold animate-pulse"
    : isInitial
    ? "bg-primary text-white cursor-pointer font-semibold"
    : "bg-[#FFEAEA] text-black font-normal text-xs";

  return (
    <div className="space-y-4">
      <p className="text-md font-semibold text-neutral-700">AI 도슨트</p>
      <div className="flex justify-center pb-4">
        <div
          className={`${balloonBase} ${balloonColor} `}
          onClick={handleClick}
        >
          {aiText ?? "AI 도슨트의 설명 듣기"}
        </div>
      </div>
    </div>
  );
}
