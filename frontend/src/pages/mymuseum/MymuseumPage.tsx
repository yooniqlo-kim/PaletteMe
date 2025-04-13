import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import MyCollectionContainer from "@/features/mymuseum/mycollection/MyCollectionContainer";
import MyCommentsContainer from "@/features/mymuseum/mycomments/MyCommentsContainer";
import WeeklyCalendar from "@/features/mymuseum/calendar/WeeklyCalendar";
import WrappedSummaryCard from "@/features/mymuseum/WrappedSummaryCard";
import RecommendationContainer from "@/features/mymuseum/recommendation/RecommendationContainer";

import masterpieces from "@/assets/masterpieces";
import shuffle from "@/shared/utils/shuffle";
import { mapReviewsToWeeklyCalendar, getStartOfWeek } from "@/shared/utils/date";
import { useWeeklyCalendarReviews } from "@/shared/hooks/useCalendarReviews";
import WrappedEmptyModal from "@/features/wrapped/WrappedEmptyModal";
import { fetchWrapped } from "@/features/wrapped/api/wrappedApi";
import { mapWrappedData } from "@/shared/utils/mapWrappedData";
import { WrappedDummy } from "@/shared/dummy/wrappedDummy";
import Footer from "@/shared/components/footer/Footer";

export default function MymuseumPage() {
  const navigate = useNavigate();
  const [isModalOpened, setIsModalOpened] = useState(false);

  const weekStart = getStartOfWeek(new Date());
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

  // 샘플 데이터 테스트용
  // const handleWrappedClick = async () => {
  //   setIsModalOpened(true);
  //   return;};

  //  api - Wrapped 데이터가 있을 경우
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

  //  api - Wrapped가 없을 경우, 샘플 데이터 사용
  const handleUseSample = () => {
    sessionStorage.setItem("wrapped-sample", JSON.stringify(WrappedDummy));
    setIsModalOpened(false);
    navigate("/wrapped?sample=true");
  };

  return (
    <div className="w-full max-w-screen-md mx-auto px-4 max-[412px]:px-2 max-[412px]:max-w-[380px]">
      <div className="max-w-screen-md mx-auto w-full scale-100 max-[412px]:scale-[0.95] transition-transform">
  
        {/* 주간 캘린더 */}
        <div className="py-4 max-[412px]:py-3 mb-5 max-[412px]:mb-4">
          <WeeklyCalendar
            data={calendarData}
            isLoading={isLoading}
            onClick={() =>
              navigate("/mymuseum/calendar", { state: { reviews } })
            }
          />
        </div>
  
        {/* 추천 작품 */}
        <div className="mb-6 max-[412px]:mb-3 py-1 max-[412px]:py-[0.3rem]">
          <div className="text-[20px] max-[412px]:text-[17px] leading-[1.5] font-semibold mb-2 text-black">
            추천 작품
          </div>
          <div className="text-[var(--color-neutral-8)] text-sm max-[412px]:text-xs">
            <span className="font-semibold">{nickname}</span> 님을 위한 추천 작품이에요.
          </div>
          <RecommendationContainer />
        </div>
  
        {/* Wrapped */}
        <div className="mb-6 max-[412px]:mb-3 py-2 max-[412px]:py-[0.3rem]">
          <div className="text-[20px] max-[412px]:text-[17px] leading-[1.5] font-semibold mb-3">
            Wrapped
          </div>
          <WrappedSummaryCard onClick={handleWrappedClick} />
        </div>
  
        {/* 나의 컬렉션 */}
        <div className="mb-6 max-[412px]:mb-3 py-2 max-[412px]:py-[0.3rem]">
          <div className="text-[20px] max-[412px]:text-[17px] leading-[1.5] font-semibold mb-3">
            나의 컬렉션
          </div>
          <MyCollectionContainer images={myCollectionImages} />
        </div>
  
        {/* 감상문 */}
        <div className="mb-6 max-[412px]:mb-3 py-2 max-[412px]:py-[0.3rem]">
          <div className="text-[20px] max-[412px]:text-[17px] leading-[1.5] font-semibold mb-3">
            감상문
          </div>
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
      <Footer />
    </div>
  );
  
}
