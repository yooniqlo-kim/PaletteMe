import Container from "@/shared/components/layout/Container";
import NotFoundImg from "../assets/images/NotFound.png";

export default function NotFoundPage() {
  return (
    <Container>
      <div className="flex flex-col justify-center items-center gap-10 py-30">
        <img src={NotFoundImg} alt="Not found" className="mb-4" />
        <p className="font-semibold text-black text-sm">
          존재하지 않는 페이지입니다.
        </p>
        <a href="/" className="font-semibold text-neutral-5">
          홈으로 가기
        </a>
      </div>
    </Container>
  );
}
