import { useState } from "react";
import MonthlyCalendar from "@/features/mymuseum/calendar/MonthlyCalendar";
import { weeklyDummy } from "@/shared/dummy/weeklyDummy";

export default function CalenderPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div className="p-4 my-4">
      <MonthlyCalendar
        selectedDate={selectedDate}
        onBackToWeek={() => {
          // 뒤로가기: 마이뮤지엄으로
          window.history.back();
        }}
        reviews={weeklyDummy}
        onMonthChange={setSelectedDate}
      />
    </div>
  );
}
