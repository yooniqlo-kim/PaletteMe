import MyCollection from "@/features/mymuseum/mycollection/MyCollection";
import MyComments from "@/features/mymuseum/mycomments/MyComments";
import masterpieces from "@/assets/masterpieces";
import shuffle from "@/shared/utils/shuffle";
import WrappedSummaryCard from "@/features/mymuseum/WrappedSummaryCard";
import CalendarPreviewCard from "@/features/mymuseum/calendar/CalendarPreviewCard";


export default function MymuseumPage() {
  const shuffled = shuffle(masterpieces).slice(0, 4);
  const myCollectionImages = shuffled.slice(0, 2);
  const myCommentsImages = shuffled.slice(2, 4);

  return (
    <div className="px-4">
      <div className="max-w-[420px] mx-auto w-full">
        <div className="text-lg font-bold mb-4">마이뮤지엄</div>
        <div className="mb-6">
          <CalendarPreviewCard />
        </div>

        <div className="mb-6">
          <div className="text-base font-semibold mb-2">추천 작품</div>
          <div>oo 님을 위한 추천 작품이에요.</div>
          {/* 추천 작품 카드들 자리 */}
        </div>

        <div className="mb-6">
          <div className="text-base font-semibold mb-2">Wrapped</div>
          <WrappedSummaryCard />
        </div>

        <div className="mb-6">
          <div className="text-base font-semibold mb-2">나의 컬렉션</div>
          <MyCollection images={myCollectionImages} />
        </div>

        <div className="mb-6">
          <div className="text-base font-semibold mb-2">감상문</div>
          <MyComments images={myCommentsImages} />
        </div>
      </div>
    </div>
  );
}

