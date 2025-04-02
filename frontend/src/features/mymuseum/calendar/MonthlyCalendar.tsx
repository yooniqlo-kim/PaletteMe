import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import {
  getMonthCalendarDays,
  mapReviewsToMonthlyCalendar,
} from '@/shared/utils/date';
import type { WeeklyReview } from '@/shared/types/calendar';

import IconLeftArrow from '@shared/components/icons/IconLeftArrow';  // 왼쪽 화살표 아이콘
import IconRightArrow from '@shared/components/icons/IconRightArrow'; // 오른쪽 화살표 아이콘
import placeholder_40x40 from "@/assets/images/placeholder-art-light-40x40.jpg";

interface MonthlyCalendarProps {
  selectedDate: Date;
  onBackToWeek: () => void;
  onMonthChange: (newDate: Date) => void;
  reviews: WeeklyReview[];
}

export default function MonthlyCalendar({
  selectedDate,
  onMonthChange,
  reviews,
}: MonthlyCalendarProps) {
  const navigate = useNavigate();
  const formattedMonth = dayjs(selectedDate).format('YYYY년 M월');
  const calendarDates = getMonthCalendarDays(selectedDate);
  const currentMonth = dayjs(selectedDate).month();

  const calendarData = mapReviewsToMonthlyCalendar(reviews, calendarDates);

  // 이전/다음달 이동 핸들러
  const handlePrevMonth = () => {
    const prevMonth = dayjs(selectedDate).subtract(1, 'month').toDate();
    onMonthChange(prevMonth);
  };

  const handleNextMonth = () => {
    const nextMonth = dayjs(selectedDate).add(1, 'month').toDate();
    onMonthChange(nextMonth);
  };

  return (
    <div className="w-full max-w-[26.25rem] mx-auto px-3 py-10 pb-[3.75rem]">
      {/* 이동 버튼 */}
      <div className="flex justify-between items-center py-4">
        <button onClick={handlePrevMonth} className="text-xl px-2">
          <IconLeftArrow className="w-5 h-5"/>
        </button>
        <h2 className="text-md font-bold">{formattedMonth}</h2>
        <button onClick={handleNextMonth} className="text-xl px-2">
          <IconRightArrow className="w-5 h-5"/>
        </button>
      </div>

      {/* 요일 헤더 */}
      <div className="grid grid-cols-7 gap-5 text-center text-sm text-gray-600 mb-4">
        {['일', '월', '화', '수', '목', '금', '토'].map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      {/* 날짜 및 감상문 */}
      <div className="flex flex-col gap-4">
        {Array.from({ length: Math.ceil(calendarData.length / 7) }).map((_, weekIndex) => (
          <div key={weekIndex} className="grid grid-cols-7 gap-4">
            {calendarData
              .slice(weekIndex * 7, weekIndex * 7 + 7)
              .map((day, idx) => {
                const isCurrentMonth = dayjs(day.date).month() === currentMonth;
                // const dayNumber = dayjs(day.date).date();
                const hasComment = !!day.commentId;

                return (
                  <div key={idx} className="w-10 h-10 mx-auto flex items-center justify-center">
                    {hasComment ? (
                      <div
                        onClick={() => navigate(`/comment/${day.commentId}`)}
                        className="w-full h-full rounded-full overflow-hidden border-4 cursor-pointer"
                        style={{ borderColor: "#FF718E" }}
                      >
                        <img
                          src={day.imageUrl || placeholder_40x40}
                          alt={`${day.date} 감상문`}
                          className="w-full h-full object-cover rounded-full"
                          onError={(e) => {
                            e.currentTarget.src = placeholder_40x40;
                          }}
                        />
                      </div>
                    ) : (
                      <div
                        className={`w-full h-full rounded-full flex items-center justify-center
                          ${isCurrentMonth ? 'bg-neutral-300 text-black' : 'bg-neutral-100 text-gray-400'}`}
                      >
                        {/* <span className="text-sm">{dayNumber}</span> */}
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
        ))}
      </div>
    </div>
  );
}
