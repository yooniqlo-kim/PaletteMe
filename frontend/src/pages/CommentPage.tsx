import { CommentCard } from "@shared/components/comments/CommentCard";
import { CommentTicket } from "@shared/components/comments/CommentTicket";
import { WriterMeta } from "@shared/components/comments/WriterMeta";
import { ArtworkMeta } from "@/shared/components/artworks/ArtworkMeta";
import { ArtworkImage } from "@/shared/components/artworks/ArtworkImage";

import { BaseComment } from "@/shared/types/comment";
import { Artwork } from "@/shared/types/artwork";
import { BaseUser } from "@/shared/types/user";

export default function CommentPage() {
  //dummy data
  const dummyUser: BaseUser = {
    userId: "u001",
    profileImageUrl:
      "https://i.namu.wiki/i/3VziV9_sgCyHf-34Nv7iKCHAC6gY5Pxs3xQ6fcqPoBTp2Gp5Tb2LnhM6yVryu8grbm6-izIBMFagq1dc7OoyeA.webp",
    nickname: "미니마니모네",
  };
  const dummyComment: BaseComment = {
    commentId: "c001",
    user: {
      userId: "u002",
      profileImageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/a/a7/Inwangjesaekdo.jpg",
      nickname: "고흐좋아",
    },
    date: "2024.03.19",
    content:
      "모네의 미니마니모네 모네의 미니마니모네 모네의 미니마니모네 모네의 미니마니모네 모네의 미니마니모네 모네의 미니마니모네 모네의 미니마니모네 모네의 미니마니모네모네의 미니마니모네 모네의 미니마니모네 모네의 미니마니모네 모네의 미니마니모네모네의 미니마니모네 모네의 미니마니모네 모네의 미니마니모네 모네의 미니마니모네모네의 미니마니모네 모네의 미니마니모네 모네의 미니마니모네 모네의 미니마니모네모네의 미니마니모네 모네의 미니마니모네 모네의 미니마니모네 모네의 미니마니모네모네의 미니마니모네 모네의 미니마니모네 모네의 미니마니모네 모네의 미니마니모네모네의 미니마니모네 모네의 미니마니모네 모네의 미니마니모네 모네의 미니마니모네",
    likeCount: 123,
  };

  const dummyArtwork: Artwork = {
    artworkId: "a001",
    title: "파라솔을 든 여인 - 모네부인과 그녀의 아들",
    artist: "클로드 모네",
    artworkImageUrl:
      "https://cdn.safetimes.co.kr/news/photo/202106/96480_77112_1213.jpg",
    year: "1875",
    location: "오르세 미술관",
    description: "모네의 인상주의 대표작 중 하나...",
  };
  const handleCommentClick = (commentId: string) => {
    alert(`Comment clicked: ${commentId}`);
  };

  return (
    <div className="p-6 space-y-10">
      <h1 className="text-2xl font-bold">CommentPage</h1>

      <section className="p-4 bg-white rounded shadow">
        <h2 className="text-lg font-semibold mb-2">WriterMeta</h2>
        <WriterMeta user={dummyUser} date="2024.03.25" />
      </section>

      <section className="p-4 bg-white rounded shadow space-y-4">
        <h2 className="text-lg font-semibold">CommentCard</h2>

        <CommentCard
          comment={dummyComment}
          artworkImageUrl={dummyArtwork.artworkImageUrl}
          variant="list"
          onClick={handleCommentClick}
        />

        <CommentCard comment={dummyComment} variant="detail" />
      </section>

      <section className="p-4 bg-white rounded shadow">
        <h2 className="text-lg font-semibold mb-2">CommentTicket</h2>
        <CommentTicket
          comment={dummyComment}
          artwork={dummyArtwork}
          onClick={handleCommentClick}
        />
      </section>

      <section className="p-4 bg-white rounded shadow space-y-4">
        <h2 className="text-lg font-semibold mb-2">
          ArtworkImage & ArtworkMeta
        </h2>
        <div className="flex gap-4">
          <div className="w-1/2">
            <ArtworkImage artwork={dummyArtwork} />
          </div>
          <div className="w-1/2 bg-gray-50 p-4 rounded">
            <ArtworkMeta artwork={dummyArtwork} showYear showLocation />
          </div>
        </div>
      </section>
    </div>
  );
}
