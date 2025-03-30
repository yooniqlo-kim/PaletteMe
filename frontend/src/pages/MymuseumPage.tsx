import MyCollectionContainer from "@/features/mymuseum/mycollection/MyCollectionContainer";
import MyCommentsContainer from "@/features/mymuseum/mycomments/MyCommentsContainer";
import masterpieces from "@/assets/masterpieces";
import shuffle from "@/shared/utils/shuffle";
import WeeklyCalendar from "@/features/mymuseum/calendar/WeeklyCalendar";
import WrappedSummaryCard from "@/features/mymuseum/WrappedSummaryCard";
import RecommendationContainer from "@/features/mymuseum/recommendation/RecommendationContainer";
import { useNavigate } from "react-router-dom";
import { weeklyDummy } from "@/shared/dummy/weeklyDummy ";

// 요일 변환 함수
const getDayName = (dateStr: string): string => {
  const date = new Date(dateStr);
  return ['일', '월', '화', '수', '목', '금', '토'][date.getDay()];
};

export default function MymuseumPage() {
  const navigate = useNavigate();
  const shuffled = shuffle(masterpieces).slice(0, 4);

  // RecommendedArtwork 형태로 매핑
  const myCollectionImages = shuffled.slice(0, 2).map((img, i) => ({
    artworkId: `c${i}`,
    imgUrl: img.image,
    title: img.title,
    artist: img.artist,
    liked: false,
  }));

  // CommentPreview 형태로 매핑
  const myCommentsImages = shuffled.slice(2, 4).map((img, i) => ({
    id: `cm${i}`,
    imageUrl: img.image,
    title: img.title,
    artist: img.artist,
  }));

  // ✅ WeeklyReview → CalendarDay로 변환
  const calendarData = ['월', '화', '수', '목', '금', '토', '일'].map((day) => {
    const matched = weeklyDummy.find((review) => getDayName(review.date) === day);
    return {
      day,
      hasDiary: !!matched,
      imageUrl: matched?.imgUrl,
    };
  });

  return (
    <div className="px-4 pb-[3.75rem]">
      <div className="max-w-[26.25rem] mx-auto w-full">
        <div className="text-lg font-bold mb-4">마이뮤지엄</div>

        <div className="mb-6">
          <WeeklyCalendar
            data={calendarData}
            onClick={() => navigate("/mymuseum/calendar")}
          />
        </div>

        <div className="mb-6">
          <div className="text-base font-semibold mb-2">추천 작품</div>
          <div>모네덕후님을 위한 추천 작품이에요.</div>
          <RecommendationContainer />
        </div>

        <div className="mb-6">
          <div className="text-base font-semibold mb-2">Wrapped</div>
          <WrappedSummaryCard />
        </div>

        <div className="mb-6">
          <div className="text-base font-semibold mb-2">나의 컬렉션</div>
          <MyCollectionContainer images={myCollectionImages} />
        </div>

        <div className="mb-6">
          <div className="text-base font-semibold mb-2">감상문</div>
          <MyCommentsContainer images={myCommentsImages} />
        </div>
      </div>
    </div>
  );
}
