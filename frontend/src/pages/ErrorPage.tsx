import { Link } from "react-router";
import NotFoundImg from "../assets/images/NotFound.png";

type ErrorPageProps = {
  message?: string;
};

export default function ErrorPage({ message }: ErrorPageProps) {
  return (
    <div className="flex flex-col justify-center items-center gap-7 py-12 min-h-[calc(100vh-116px)]">
      <img
        src={NotFoundImg}
        alt="에러 이미지"
        className="w-[200px] h-[200px]"
      />
      <p className="font-semibold text-black text-sm text-center whitespace-pre-wrap">
        {message ?? "문제가 발생했습니다.\n잠시 후 다시 시도해주세요."}
      </p>
      <Link to="/" className="font-semibold text-neutral-5">
        홈으로 가기
      </Link>
    </div>
  );
}
