import { useState } from "react";
import mainLogo from "@/assets/images/MainLogo_100x100.png";

type AIDocentBoxProps = {
  onFetchExplanation: () => Promise<string>;
};

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export function AIDocentBox({ onFetchExplanation }: AIDocentBoxProps) {
  const [loading, setLoading] = useState(false);
  const [aiText, setAiText] = useState<string | null>(null);
  const [error, setError] = useState(false);

  const isLoggedIn = Boolean(sessionStorage.getItem("user"));
  const isInitial = !aiText;

  const handleClick = async () => {
    if (loading || aiText) return;

    if (!isLoggedIn) {
      setAiText("로그인 후에 물감이의 설명을 들어보세요");
      return;
    }

    setLoading(true);
    setError(false);

    try {
      const [text] = await Promise.all([onFetchExplanation(), delay(0)]);
      setAiText(text);
    } catch (err) {
      console.error("AI 설명 로딩 실패", err);
      setAiText("AI 설명을 가져오지 못했습니다.");
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const balloonBase = `
    px-4 py-3 rounded-ps
    text-xs whitespace-pre-line transition-all duration-500 ease-in-out
    inline-block max-w-[80%] text-left relative
  `;

  const balloonColor = loading
    ? "bg-primary/60 text-white font-semibold animate-pulse"
    : error
    ? "bg-gray-300 text-red-500 font-semibold"
    : isInitial
    ? "bg-primary text-white cursor-pointer font-semibold"
    : "bg-[#FFEAEA] text-black font-normal";

  return (
    <div className="space-y-4">
      <p className="font-semibold text-md text-neutral-700">AI 도슨트</p>
      <div className="relative flex justify-center pb-4">
        <div className={`${balloonBase} ${balloonColor}`} onClick={handleClick}>
          {aiText ?? "물감이의 설명 듣기"}
          <img
            src={mainLogo}
            alt="AI 도슨트 물감이"
            className="w-12 h-12 absolute -top-9.5 left-8/9 -translate-x-1/2"
          />
        </div>
      </div>
    </div>
  );
}
