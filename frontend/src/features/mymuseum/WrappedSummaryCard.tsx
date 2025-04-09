import { useEffect, useState } from "react";
import wrappedThumbnail from "@/assets/images/wrapped-thumbnail.jpg";

interface WrappedSummaryCardProps {
  onClick?: () => void;
}

export default function WrappedSummaryCard({ onClick }: WrappedSummaryCardProps) {
  const [nickname, setNickname] = useState("");

  useEffect(() => {
    const userData = sessionStorage.getItem("user");
    if (userData) {
      const parsed = JSON.parse(userData);
      if (parsed.nickname) {
        setNickname(parsed.nickname);
      }
    }
  }, []);

  return (
    <div
      onClick={onClick}
      className="relative w-full max-w-[23.75rem] h-[13.75rem] rounded-lg overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-[1.02] group"
    >
      <img
        src={wrappedThumbnail}
        alt="Wrapped Thumbnail"
        className="w-full h-full object-cover transition duration-300 hover:brightness-110"
      />
      <p
        className="absolute inset-0 flex flex-col items-center justify-center text-black font-semibold text-center px-4 leading-snug transition-all duration-300"
        style={{
          fontSize: "var(--text-md)",
        }}
      >
        <span className="mb-1 transition-all duration-300 group-hover:text-[1.3rem]">
          지난 한 달 동안
        </span>
        <span className="mb-1 transition-all duration-300 group-hover:text-[1.3rem]">
        <span
            style={{ color: "var(--color-primary)" }}
            className="font-semibold"
          >
            {nickname || "사용자"}
          </span>
          <span className="text-black">님은</span>
        </span>
        <span className="transition-all duration-300 group-hover:text-[1.3rem]">
          어떤 작품을 만났을까요?
        </span>
      </p>
    </div>
  );
}