import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

import MyCollectionContainer from "@/features/mymuseum/mycollection/MyCollectionContainer";
import MyCommentsContainer from "@/features/mymuseum/mycomments/MyCommentsContainer";
import WeeklyCalendar from "@/features/mymuseum/calendar/WeeklyCalendar";
import WrappedSummaryCard from "@/features/mymuseum/WrappedSummaryCard";
import RecommendationContainer from "@/features/mymuseum/recommendation/RecommendationContainer";

import masterpieces from "@/assets/masterpieces";
import shuffle from "@/shared/utils/shuffle";
import { mapReviewsToWeeklyCalendar } from "@/shared/utils/date";
import { useWeeklyCalendarReviews } from "@/shared/hooks/useCalendarReviews";

export default function MymuseumPage() {
  const navigate = useNavigate();
  const weekStart = dayjs().startOf("week").add(1, "day").toDate();

  const {
    data: reviews,
    isLoading,
  } = useWeeklyCalendarReviews(weekStart);

  const shuffled = shuffle(masterpieces).slice(0, 4);

  const myCollectionImages = shuffled.slice(0, 2).map((img, i) => ({
    artworkId: `c${i}`,
    imgUrl: img.image,
    title: img.title,
    artist: img.artist,
    isLiked: false,
  }));

  const myCommentsImages = shuffled.slice(2, 4).map((img, i) => ({
    id: `cm${i}`,
    imageUrl: img.image,
    title: img.title,
    artist: img.artist,
  }));

  const calendarData = mapReviewsToWeeklyCalendar(reviews ?? [], weekStart);

  const user = JSON.parse(sessionStorage.getItem("user") || "{}");
  const nickname = user?.nickname || "사용자";

  return (
    <div className="px-4 pb-[3.75rem]">
      <div className="max-w-[26.25rem] mx-auto w-full">
        <div className="text-lg font-bold mb-4">마이뮤지엄</div>

        <div className="mb-6">
          <WeeklyCalendar
            data={calendarData}
            isLoading={isLoading}
            onClick={() =>
              navigate("/mymuseum/calendar", { state: { reviews } })
            }
          />
        </div>

        <div className="mb-6">
          <div className="text-base font-semibold mb-2">추천 작품</div>
          <div>{nickname}님을 위한 추천 작품이에요.</div>
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
