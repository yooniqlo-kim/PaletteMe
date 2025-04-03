import { useState, useRef, useMemo } from "react";
import { useLocation } from "react-router-dom";

import MonthlyCalendar from "@/features/mymuseum/calendar/MonthlyCalendar";
import { useCalendarReviews } from "@shared/hooks/useCalenderReviews";
import { WeeklyReview } from "@/shared/types/calendar";

export default function CalendarPage() {
  const location = useLocation();

  // 마이뮤지엄에서 전달한 감상문 초기 데이터
  const initialReviews = useRef(location.state?.reviews as WeeklyReview[] | undefined);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const year = selectedDate.getFullYear();
  const month = selectedDate.getMonth() + 1;

  // 해당 월의 데이터만 추려서 초기값으로 전달
  const filteredInitialData = useMemo(() => {
    if (!initialReviews.current) return undefined;
    return initialReviews.current.filter((r) => {
      const dateObj = new Date(r.date);
      return dateObj.getFullYear() === year && dateObj.getMonth() + 1 === month;
    });
  }, [month, year]);

  const { data: reviews = [] } = useCalendarReviews(year, month, filteredInitialData);

  return (
    <div className="p-4 my-4">
      <MonthlyCalendar
        selectedDate={selectedDate}
        reviews={reviews}
        onMonthChange={setSelectedDate}
      />
    </div>
  );
}
