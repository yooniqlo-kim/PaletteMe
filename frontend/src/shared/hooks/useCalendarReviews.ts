import { useQueries, useQuery } from "@tanstack/react-query";
import {
  getMonthlyCalendarReviews,
  getWeeklyCalendarReviews,
} from "@shared/api/calendar";
import { WeeklyReview } from "@shared/types/calendar";
import dayjs from "dayjs";

/**
 * ✅ 주간 달력에서 한 주가 두 달에 걸칠 수 있기 때문에,
 * 포함된 모든 (year, month) 조합에 대해 월간 API 요청
 */
export const useMonthlyCalendarReviewsForWeek = (weekStartDate: Date) => {
  const dates = Array.from({ length: 7 }).map((_, i) =>
    dayjs(weekStartDate).add(i, "day")
  );

  const yearMonthSet = new Set<string>();
  dates.forEach((date) => {
    yearMonthSet.add(`${date.year()}-${date.month() + 1}`);
  });

  const queries = Array.from(yearMonthSet).map((key) => {
    const [year, month] = key.split("-").map(Number);

    return {
      queryKey: ["calendar-reviews", year, month],
      queryFn: async (): Promise<WeeklyReview[]> => {
        const raw = await getMonthlyCalendarReviews(year, month);
        return raw.map((item) => ({
          reviewId: item.reviewId,
          imgUrl: item.imgUrl,
          date: item.createdAt.split("T")[0],
        }));
      },
      staleTime: 1000 * 60 * 10,
    };
  });

  const results = useQueries({ queries });

  const isLoading = results.some((r) => r.isLoading);
  const isError = results.some((r) => r.isError);

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
 * ✅ 월간 달력에서 특정 월의 감상문을 가져오는 훅
 */
export const useMonthlyCalendarReviews = (
  year: number,
  month: number,
  placeholderData?: WeeklyReview[]
) => {
  return useQuery<WeeklyReview[]>({
    queryKey: ["calendar-reviews", year, month],
    queryFn: async () => {
      const raw = await getMonthlyCalendarReviews(year, month);
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

/**
 * ✅ 주간 감상문 조회 API 전용 훅
 */
export const useWeeklyCalendarReviews = (weekStartDate: Date) => {
  const start = dayjs(weekStartDate).format("YYYY-MM-DD");
  const end = dayjs(weekStartDate).add(6, "day").format("YYYY-MM-DD");

  return useQuery<WeeklyReview[]>({
    queryKey: ["calendar-reviews-weekly", start, end],
    queryFn: async () => {
      const raw = await getWeeklyCalendarReviews(start, end);
      return raw.map((item) => ({
        reviewId: item.reviewId,
        imgUrl: item.imgUrl,
        date: item.createdAt.split("T")[0],
      }));
    },
    staleTime: 1000 * 60 * 10,
  });
};
