import { useNavigate } from "react-router-dom";
import wrappedThumbnail from "@/assets/images/wrapped-thumbnail.jpg";

export default function WrappedSummaryCard() {
    const navigate = useNavigate();
  
    const handleClick = () => {
      navigate("/wrapped");
    };
  
    return (
      <div
        onClick={handleClick}
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
            fontSize: "var(--text-md)",           // 기본 1.25rem
          }}
        >
          <span className="transition-all duration-300 group-hover:text-[1.375rem]">
            지난 한달 간의 활동 기록을
          </span>
          <span className="transition-all duration-300 group-hover:text-[1.375rem]">
            확인해볼까요?
          </span>
        </p>
      </div>
    );
  }
  
