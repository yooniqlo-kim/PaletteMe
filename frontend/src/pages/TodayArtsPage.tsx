import { CommentTicket } from "@/shared/components/comments/CommentTicket";

export default function TodayArtsPage() {
  return (
    <>
      <div>TodayArtsPage</div>
      <div className="flex justify-center">
        <CommentTicket
          artworkImageUrl="https://cdn.safetimes.co.kr/news/photo/202106/96480_77112_1213.jpg"
          likeCount={123}
          title="파라솔을 든 여인 - 모네부인과 그녀의 아들"
          artist="클로드 모네"
          profileImageUrl="https://upload.wikimedia.org/wikipedia/commons/a/a7/Inwangjesaekdo.jpg"
          nickname="미니마니모네"
          date="2024.3.19."
          content="모네의 미니마니모네 모네의 미니마니모네 모네의 미니마니모네 모네의 미니마니모네 모네의 미니마니모네 모네의 미니마니모네 모네의 미니마니모네 모네의 미니마니모네 모네의 미니마니모네 모네의 미니마니모네 모네의 미니마니모네 모네의 미니마니모네 모네의 미니마니모네 모네의 미니마니모네 모네의 미니마니모네 모네의 미니마니모네 모네의 미니마니모네 "
        />
      </div>
    </>
  );
}
