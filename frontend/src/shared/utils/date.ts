import dayjs from "dayjs";
import "dayjs/locale/ko";
import { WeeklyReview, CalendarDay } from "@/shared/types/calendar.ts";

dayjs.locale("ko");

// 주간 Calendar용: 오늘 날짜 (ex. "3월 31일 월요일")
export const getTodayString = () => {
  return dayjs().format("M월 D일 dddd");
};

// 주간 Calendar용: 이번 주 월요일 반환 (한국시간)
export const getStartOfWeek = (date: Date): Date => {
  const day = dayjs(date);
  return (day.day() === 0 ? day.subtract(6, "day") : day.startOf("week").add(1, "day")).toDate();
};

// 주간 Calendar용: 이번 주 일요일 반환 (한국시간)
export const getEndOfWeek = (date: Date): Date => {
  const day = dayjs(date);
  return (day.day() === 0 ? day : day.startOf("week").add(7, "day")).toDate();
};


// 주간 Calendar용: 감상문 데이터를 요일 순서로 변환
export const mapReviewsToWeeklyCalendar = (
  reviews: WeeklyReview[],
  weekStartDate: Date
): CalendarDay[] => {
  const days: CalendarDay[] = [];

  for (let i = 0; i < 7; i++) {
    const current = new Date(weekStartDate);
    current.setDate(current.getDate() + i);

    const dateStr = dayjs(current).format("YYYY-MM-DD");
    const matchedReview = reviews.find((r) => r.date === dateStr);

    if (matchedReview) {
      days.push({
        date: matchedReview.date,
        reviewId: matchedReview.reviewId,
        imgUrl: matchedReview.imgUrl,
      });
    } else {
      days.push({ date: dateStr });
    }
  }

  return days;
};

// 월간 Calendar용 : 이번 달 달력용 날짜 리스트 (일 ~ 토)
export const getMonthCalendarDays = (date: Date): Date[] => {
  const startOfMonth = dayjs(date).startOf("month");
  const endOfMonth = dayjs(date).endOf("month");

  const startDay = startOfMonth.startOf("week"); // 일요일 시작
  const endDay = endOfMonth.endOf("week");

  const days: Date[] = [];
  let current = startDay;

  while (current.isBefore(endDay) || current.isSame(endDay, "day")) {
    days.push(current.toDate());
    current = current.add(1, "day");
  }

  return days;
};

// 월간 Calendar용: 감상문 데이터를 달력 날짜에 매핑
export const mapReviewsToMonthlyCalendar = (
  reviews: WeeklyReview[] = [],
  calendarDates: Date[]
): CalendarDay[] => {
  return calendarDates.map((date) => {
    const dateStr = dayjs(date).format("YYYY-MM-DD");
    const matched = reviews.find((r) => r.date === dateStr);

    if (matched) {
      return {
        date: matched.date,
        reviewId: matched.reviewId,
        imgUrl: matched.imgUrl,
      };
    } else {
      return { date: dateStr };
    }
  });
};

// Wrapped 페이지 타이틀용 (ex. "2025 03")
export const getWrappedMonthString = () => {
  return dayjs().subtract(1, "month").format("YYYY MM");
};

// 감상문 날짜 변환용
export const formatDate = (isoString: string): string => {
  const date = new Date(isoString);
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${year}.${month}.${day}`;
};
