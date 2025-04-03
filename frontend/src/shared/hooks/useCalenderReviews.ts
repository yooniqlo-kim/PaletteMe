import { useQueries } from "@tanstack/react-query";
import { getCalendarReviews } from "@shared/api/calendar";
import { WeeklyReview } from "@shared/types/calendar";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";

/**
 * 주간 달력에서 한 주가 두 달에 걸칠 수 있기 때문에,
 * 포함된 모든 (year, month) 조합에 대해 데이터를 요청함
 */
export const useWeeklyCalendarReviews = (weekStartDate: Date) => {
  // 그 주의 모든 날짜 구하기
  const dates = Array.from({ length: 7 }).map((_, i) =>
    dayjs(weekStartDate).add(i, "day")
  );

  // 포함된 (year, month) 조합 구하기 (중복 제거)
  const yearMonthSet = new Set<string>();
  dates.forEach((date) => {
    yearMonthSet.add(`${date.year()}-${date.month() + 1}`);
  });

  // useQueries용 query 객체 만들기
  const queries = Array.from(yearMonthSet).map((key) => {
    const [year, month] = key.split("-").map(Number);

    return {
      queryKey: ["calendar-reviews", year, month],
      queryFn: async (): Promise<WeeklyReview[]> => {
        const raw = await getCalendarReviews(year, month);
        return raw.map((item) => ({
          reviewId: item.reviewId,
          imgUrl: item.imgUrl,
          date: item.createdAt.split("T")[0],
        }));
      },
      staleTime: 1000 * 60 * 0, // 10분으로 바꾸기
    };
  });

  const results = useQueries({ queries });

  const isLoading = results.some((r) => r.isLoading);
  const isError = results.some((r) => r.isError);

  // 모든 월의 데이터를 합쳐서 반환
  const data = results
    .map((r) => r.data)
    .filter(Boolean)
    .flat() as WeeklyReview[];

  return {
    data,
    isLoading,
    isError,
  };
};

/**
 * 월간 달력에서 특정 월의 감상문을 가져오는 훅
 */
export const useCalendarReviews = (
  year: number,
  month: number,
  placeholderData?: WeeklyReview[]
) => {
  return useQuery<WeeklyReview[]>({
    queryKey: ["calendar-reviews", year, month],
    queryFn: async () => {
      const raw = await getCalendarReviews(year, month);
      return raw.map((item) => ({
        reviewId: item.reviewId,
        imgUrl: item.imgUrl,
        date: item.createdAt.split("T")[0],
      }));
    },
    staleTime: 1000 * 60 * 10,
    placeholderData,
  });
};