import { useEffect, useState } from "react";
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
import WrappedEmptyModal from "@/features/wrapped/WrappedEmptyModal";
import { fetchWrapped } from "@/features/wrapped/api/wrappedApi";
import { mapWrappedData } from "@/shared/utils/mapWrappedData";
import { WrappedDummy } from "@/shared/dummy/wrappedDummy";

export default function MymuseumPage() {
  const navigate = useNavigate();
  const [isModalOpened, setIsModalOpened] = useState(false);

  const weekStart = dayjs().startOf("week").add(1, "day").toDate();
  const { data: reviews, isLoading, refetch } = useWeeklyCalendarReviews(weekStart);

  // 페이지 진입할 때마다 refetch
  useEffect(() => {
    void refetch();
  }, [refetch]);

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

  const handleWrappedClick = async () => {
    try {
      const raw = await fetchWrapped();
      const mapped = mapWrappedData(raw);

      if (mapped.reviewRank.reviewCount === 0) {
        setIsModalOpened(true);
      } else {
        navigate("/wrapped");
      }
    } catch (e) {
      console.error("랩트 데이터 확인 실패:", e);
      setIsModalOpened(true);
    }
  };

  const handleUseSample = () => {
    sessionStorage.setItem("wrapped-sample", JSON.stringify(WrappedDummy));
    setIsModalOpened(false);
    navigate("/wrapped?sample=true");
  };

  return (
    <div className="px-4 pb-[2rem]">
      <div className="max-w-screen-md mx-auto w-full">
        <div className="py-4 mb-6">
          <WeeklyCalendar
            data={calendarData}
            isLoading={isLoading}
            onClick={() => navigate("/mymuseum/calendar", { state: { reviews } })}
          />
        </div>

        <div className="mb-6 py-1">
          <div className="text-[20px] leading-[1.5] font-semibold mb-2 text-black">
            추천 작품
          </div>
          <div style={{ color: "var(--color-neutral-8)" }}>
            <span className="font-semibold">{nickname}</span>
            님을 위한 추천 작품이에요.
          </div>
          <RecommendationContainer />
        </div>

        <div className="mb-6 py-2">
          <div className="text-[20px] leading-[1.5] font-semibold mb-3">Wrapped</div>
          <WrappedSummaryCard onClick={handleWrappedClick} />
        </div>

        <div className="mb-6 py-2">
          <div className="text-[20px] leading-[1.5] font-semibold mb-3">나의 컬렉션</div>
          <MyCollectionContainer images={myCollectionImages} />
        </div>

        <div className="mb-6 py-2">
          <div className="text-[20px] leading-[1.5] font-semibold mb-3">감상문</div>
          <MyCommentsContainer images={myCommentsImages} />
        </div>
      </div>

      {isModalOpened && (
        <WrappedEmptyModal
          open={isModalOpened}
          onClose={() => setIsModalOpened(false)}
          onUseSample={handleUseSample}
        />
      )}
    </div>
  );
}
