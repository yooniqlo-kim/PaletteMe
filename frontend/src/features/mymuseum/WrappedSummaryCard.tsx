import { useNavigate } from "react-router-dom";
import wrappedThumbnail from "@/assets/images/wrapped_thumbnail.jpg";

export default function WrappedSummaryCard() {
    const navigate = useNavigate();
  
    const handleClick = () => {
      navigate("/wrapped");
    };
  
    return (
      <div
        onClick={handleClick}
        className="relative w-full max-w-[23.75rem] h-[13.75rem] rounded-lg overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-[1.02]"
      >
        <img
          src={wrappedThumbnail}
          alt="Wrapped Thumbnail"
          className="w-full h-full object-cover transition duration-300 hover:brightness-110"
        />
        <p className="absolute inset-0 flex items-center justify-center text-black text-base font-semibold text-center px-4 transition duration-300 hover:text-lg">
          지난 한달 간의 활동 기록을 확인해볼까요?
        </p>
      </div>
    );
  }
  
