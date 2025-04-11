import { useState } from "react";
import { useNavigate } from "react-router";
import { ArtworkImage } from "../detail/ArtworkImage";
import { ArtworkMeta } from "@/shared/components/artworks/ArtworkMeta";
import { WhiteContainer } from "@/shared/components/textbox/WhiteRoundedContainer";
import { DescriptionBox } from "../detail/DescriptionBox";
import IconButton from "@/shared/components/buttons/IconButton";
import IconThreeDots from "@/shared/components/icons/IconThreeDots";
import DropdownMenu from "./CommentDropdown";
import IconThumb from "@/shared/components/icons/IconThumb";
import {
  deleteComment,
  likeComment,
  cancelLikeComment,
} from "@/shared/api/comment";
import { WriterMeta } from "@/shared/components/comments/WriterMeta";
import { BaseComment } from "@/shared/types/comment";
import { ArtworkPreview } from "@/shared/types/artwork";
import Modal from "@/shared/components/modal/Modal";

type Props = {
  comment: BaseComment;
  artwork: ArtworkPreview;
};

export function CommentDetail({ comment, artwork }: Props) {
  const navigate = useNavigate();
  const [likeCount, setLikeCount] = useState<number>(comment.likeCount);
  const [isLiked, setIsLiked] = useState(comment.isLiked);
  const [isModalOpened, setIsModalOpened] = useState(false);
  const currentUser = sessionStorage.getItem("user");
  const currentNickname = currentUser ? JSON.parse(currentUser).nickname : null;

  const toggleLike = async () => {
    const next = !isLiked;

    // ui에서만 변경경
    setIsLiked(next);
    setLikeCount((prev) => (next ? prev + 1 : prev - 1));

    try {
      if (next) {
        await likeComment(comment.commentId);
      } else {
        await cancelLikeComment(comment.commentId);
      }
    } catch (error) {
      console.error("좋아요 처리 실패", error);
      // 롤백
      setIsLiked(!next);
      setLikeCount((prev) => (!next ? prev + 1 : prev - 1));
    }
  };

  const handleDelete = async () => {
    setIsModalOpened(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteComment(comment.commentId);
      navigate(-1); // 이전 페이지로 이동
    } catch (err) {
      console.error(err);
      alert("삭제 중 오류가 발생했습니다.");
    }
  };

  const handleEdit = () => {
    navigate(`/comments/${comment.commentId}/edit`, {
      state: { comment, artwork },
    });
  };

  return (
    <div className="min-h-screen bg-neutral-100">
      {isModalOpened && (
        <Modal
          open={isModalOpened}
          msg="감상문을 삭제하시겠습니까?"
          confirmMsg="삭제하면 되돌릴 수 없어요."
          onClose={() => setIsModalOpened(false)}
          onConfirm={confirmDelete}
        />
      )}
      <div className="pt-2 bg-neutral-200">
        <ArtworkImage artwork={artwork} />
      </div>
      <div className="flex flex-col gap-2">
        <WhiteContainer withTopRound withMarginTop>
          <div className="relative">
            <div className="absolute z-10 flex gap-2 -top-9 right-1"></div>
            <ArtworkMeta artwork={artwork} />
            <span className="flex items-center justify-between">
              <WriterMeta
                user={comment.user}
                date={comment.date}
                visibility={comment.visibility}
              />
              {comment.user.nickname === currentNickname && (
                <DropdownMenu
                  button={
                    <button className="flex items-center justify-center cursor-pointer">
                      <IconThreeDots />
                    </button>
                  }
                  options={[
                    { label: "수정하기", onClick: handleEdit },
                    { label: "삭제하기", onClick: handleDelete },
                  ]}
                />
              )}
            </span>
            <DescriptionBox description={comment.content} hideLine />
          </div>
          <div className="flex justify-end px-2 py-3">
            <IconButton identifier="review_detail" onClick={toggleLike}>
              <span className="inline-flex items-center relative top-[2px] ">
                {likeCount}
              </span>
              <IconThumb isClicked={isLiked} />
            </IconButton>
          </div>
        </WhiteContainer>
      </div>
    </div>
  );
}
