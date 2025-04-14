import Button from "@/shared/components/buttons/Button";
import MyCollectionContainer from "@/features/mymuseum/mycollection/MyCollectionContainer";
import MyCommentsContainer from "@/features/mymuseum/mycomments/MyCommentsContainer";
import shuffle from "@/shared/utils/shuffle";
import masterpieces from "@/assets/masterpieces";
import { useState } from "react";
import Modal from "@/shared/components/modal/Modal";
import { useNavigate } from "react-router";
import level0 from "@/assets/levels/level_0.svg";
import level1 from "@/assets/levels/level_1.svg";
import level2 from "@/assets/levels/level_2.svg";
import level3 from "@/assets/levels/level_3.svg";
import level4 from "@/assets/levels/level_4.svg";
import level5 from "@/assets/levels/level_5.svg";
import { Level } from "../../features/register/type/type";
import useProfile from "../../features/profile/hooks/useProfile";
import LevelSkeleton from "@/features/profile/LevelSkeleton";

const levelImages = [level0, level1, level2, level3, level4, level5];

function getLevelImage(level: Level) {
  return levelImages[level];
}

export default function ConfirmDeleteAccountPage() {
  const { profileData: data, isLoading, isError } = useProfile();

  const shuffled = shuffle(masterpieces).slice(0, 4);

  const myCollectionImages = shuffled.slice(0, 2).map((item) => ({
    artworkId: `${item.title}_${item.artist}`,
    imgUrl: item.image,
    title: item.title,
    artist: item.artist,
    isLiked: true,
  }));

  const myCommentsImages = shuffled.slice(2, 4).map((item, i) => ({
    id: `comment_${i}`, // ✅ id 안정적으로 생성
    imageUrl: item.image,
    title: item.title,
    artist: item.artist,
  }));

  const navigate = useNavigate();
  const [isDeleteBtnClicked, setIsDeleteBtnClicked] = useState(false);

  function handleDeleteButton() {
    setIsDeleteBtnClicked(true);
  }

  let content;

  if (isLoading) {
    content = <LevelSkeleton />;
  } else if (!data) {
    content = (
      <p className="text-primary flex justify-center items-center">
        회원 등급 정보를 불러오지 못했어요. <br />
        네트워크 상태를 확인하거나, 잠시 후 다시 시도해 주세요.
      </p>
    );
  } else if (isError) {
    content = (
      <p className="text-primary flex justify-center items-center">
        회원 등급 조회 중 문제가 발생했어요.
      </p>
    );
  } else {
    content = (
      <>
        <img
          className="w-full h-full"
          src={getLevelImage(Number(data!.grade) as Level)}
          alt="level"
        />
      </>
    );
  }

  return (
    <>
      {isDeleteBtnClicked && (
        <Modal
          open={isDeleteBtnClicked}
          msg="지금까지 작성한 감상문이 사라져요"
          confirmMsg="정말 탈퇴하시겠습니까?"
          onClose={() => setIsDeleteBtnClicked(false)}
          route="/profile/delete/complete"
          cancelRoute="/profile"
        />
      )}
      <section className="px-6 py-3 flex flex-col gap-6 box-border">
        <div>
          <h2 className="font-semibold text-lg">회원 탈퇴</h2>
          <p className="font-medium text-[18px]">
            탈퇴하면 다음과 같은 정보가 사라져요
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <p className="text-sm font-normal">탈퇴하면 등급이 사라져요!</p>
          {content}
        </div>

        <div className="flex flex-col gap-3">
          <p className="text-sm font-normal">탈퇴하면 컬렉션이 사라져요!</p>
          <MyCollectionContainer images={myCollectionImages} />
        </div>

        <div className="flex flex-col gap-3">
          <p className="text-sm font-normal">탈퇴하면 감상문이 사라져요!</p>
          <MyCommentsContainer images={myCommentsImages} />
        </div>

        <div className="flex gap-2">
          <Button
            size="L"
            className="!bg-white border border-primary !text-primary"
            onClick={() => navigate("/profile")}
          >
            취소하기
          </Button>
          <Button size="L" onClick={handleDeleteButton}>
            계정 삭제
          </Button>
        </div>
      </section>
    </>
  );
}
