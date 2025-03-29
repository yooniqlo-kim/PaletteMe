import dayjs from 'dayjs';
import { getMonthCalendarDays } from '@/shared/utils/date'; // ✅ 유틸 가져오기

interface MonthlyCalendarProps {
  selectedDate: Date;
  onBackToWeek: () => void;
}

export default function MonthlyCalendar({
  selectedDate,
  onBackToWeek,
}: MonthlyCalendarProps) {
  const formattedMonth = dayjs(selectedDate).format('YYYY년 M월');
  const calendarDays = getMonthCalendarDays(selectedDate);
  const currentMonth = dayjs(selectedDate).month(); // 비교용

  return (
    <div className="w-full max-w-[26.25rem] mx-auto px-4 pb-[3.75rem]">
      <div className="flex justify-between items-center py-4">
        <h2 className="text-lg font-bold">{formattedMonth}</h2>
        <button
          onClick={onBackToWeek}
          className="text-sm text-primary hover:underline"
        >
          ← 주간 보기
        </button>
      </div>

      <div className="grid grid-cols-7 gap-2 text-center text-sm text-gray-600 mb-2">
        {['일', '월', '화', '수', '목', '금', '토'].map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {calendarDays.map((date, idx) => {
          const isCurrentMonth = dayjs(date).month() === currentMonth;
          const dayNumber = dayjs(date).date();

          return (
            <div
              key={idx}
              className={`w-10 h-10 rounded-full mx-auto flex items-center justify-center
                ${isCurrentMonth ? 'bg-pink-200 text-black' : 'bg-neutral-200 text-gray-400'}`}
            >
              {dayNumber}
            </div>
          );
        })}
      </div>
    </div>
  );
}
