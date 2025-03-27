import { CommentCard } from "@shared/components/comments/CommentCard";
import { CommentTicket } from "@shared/components/comments/CommentTicket";
import { WriterMeta } from "@shared/components/comments/WriterMeta";

export default function CommentPage() {
  return (
    <>
      <div>CommentPage</div>
      <CommentCard
        profileImageUrl="https://i.namu.wiki/i/3VziV9_sgCyHf-34Nv7iKCHAC6gY5Pxs3xQ6fcqPoBTp2Gp5Tb2LnhM6yVryu8grbm6-izIBMFagq1dc7OoyeA.webp"
        nickname="미니마니모네"
        date="2024.03.25"
        content="졸리다 졸리지 않다 졸리다 졸리지 않다 졸리다 졸리지 않다 졸리다 졸리지 않다졸리다 졸리지 않다 졸리다 졸리지 않다졸리다 졸리지 않다 졸리다 졸리지 않다졸리다 졸리지 않다 졸리다 졸리지 않다졸리다 졸리지 않다 졸리다 졸리지 않다졸리다 졸리지 않다 졸리다 졸리지 않다졸리다 졸리지 않다 졸리다 졸리지 않다졸리다 졸리지 않다 졸리다 졸리지 않다졸리다 졸리지 않다 졸리다 졸리지 않다"
        likeCount={325}
        artworkImageUrl="https://mblogthumb-phinf.pstatic.net/20160507_102/mbkim6204_1462608563520HKwqJ_PNG/Women_with_umbrella_%281875%29_by_Claude_Monet.PNG?type=w420"
      />

      <WriterMeta
        profileImageUrl="https://i.namu.wiki/i/3VziV9_sgCyHf-34Nv7iKCHAC6gY5Pxs3xQ6fcqPoBTp2Gp5Tb2LnhM6yVryu8grbm6-izIBMFagq1dc7OoyeA.webp"
        nickname="미니마니모네"
        date="2024.03.25"
      />
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
    </>
  );
}
