import dayjs from "dayjs";
import "dayjs/locale/ko";
import { WeeklyReview, CalendarDay } from "@/shared/types/calendar.ts";

dayjs.locale("ko");

// 오늘 날짜 (ex. "3월 31일 월요일")
export const getTodayString = () => {
  return dayjs().format("M월 D일 dddd");
};

// 이번 달 달력용 날짜 리스트 (일 ~ 토)
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

// 주간 Calendar용: 감상문 데이터를 요일 순서로 변환
export const mapReviewsToWeeklyCalendar = (
  reviews: WeeklyReview[],
  weekStartDate: Date
): CalendarDay[] => {
  const days: CalendarDay[] = [];

  for (let i = 0; i < 7; i++) {
    const current = new Date(weekStartDate);
    current.setDate(current.getDate() + i);

    const dateStr = current.toISOString().slice(0, 10); // YYYY-MM-DD

    const matchedReview = reviews.find((r) => r.date === dateStr);

    if (matchedReview) {
      days.push({
        date: matchedReview.date,
        artworkId: matchedReview.artworkId,
        imageUrl: matchedReview.imgUrl,
        commentId: String(matchedReview.reviewId),
      });
    } else {
      days.push({ date: dateStr });
    }
  }

  return days;
};

// Wrapped 페이지 타이틀용 (ex. "2025년 2월")
export const getWrappedMonthString = () => {
  return dayjs().subtract(1, "month").format("YYYY년 M월");
};
