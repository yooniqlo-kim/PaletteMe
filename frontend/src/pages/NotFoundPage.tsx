import { Link } from "react-router";
import NotFoundImg from "../assets/images/NotFound.png";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col justify-center items-center gap-7 py-12 min-h-[calc(100vh-116px)]">
      <img
        src={NotFoundImg}
        alt="Not found"
        className="w-[200px] h-[200px]"
      />
      <p className="font-semibold text-black text-sm">
        존재하지 않는 페이지입니다.
      </p>
      <Link to="/" className="font-semibold text-neutral-5">
        홈으로 가기
      </Link>
    </div>
  );
}
