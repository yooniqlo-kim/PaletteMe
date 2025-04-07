import { useNavigate } from "react-router-dom";
import { getTodayString } from "@/shared/utils/date";
import placeholder_40x40 from "@/assets/images/placeholder-art-light-40x40.jpg";
import { CalendarDay } from "@/shared/types/calendar";

interface WeeklyCalendarProps {
  data: CalendarDay[];
  isLoading?: boolean;
  onClick?: () => void;
}

export default function WeeklyCalendar({
  data,
  isLoading,
  onClick,
}: WeeklyCalendarProps) {
  const navigate = useNavigate();
  const weekdays = ["월", "화", "수", "목", "금", "토", "일"];

  const displayData: (CalendarDay | null)[] = Array.from({ length: 7 }, (_, idx) => data?.[idx] ?? null);

  return (
    <div
      onClick={onClick}
      className="w-full max-w-[23.75rem] h-[10.75rem] rounded-xl px-4 py-3 cursor-pointer"
      style={{ backgroundColor: "#FDF7EB" }}
    >
      <h2 className="text-center text-base font-semibold mb-4 py-3">
        {getTodayString()}
      </h2>

      <div className="grid grid-cols-7 gap-2 px-2">
        {weekdays.map((weekday, idx) => {
          const day = displayData[idx];
          const hasReview = !!day?.reviewId;

          return (
            <div key={idx} className="flex flex-col items-center space-y-1">
              <span className="text-xs">{weekday}</span>

              {hasReview ? (
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/comments/${day.reviewId}`);
                  }}
                  className="w-9 h-9 rounded-full border-4 overflow-hidden cursor-pointer"
                  style={{ borderColor: "#FF718E" }}
                >
                  <img
                    src={day.imgUrl || placeholder_40x40}
                    alt={`${day.date} 감상문`}
                    className="w-full h-full object-cover rounded-full"
                    onError={(e) => {
                      e.currentTarget.src = placeholder_40x40;
                    }}
                  />
                </div>
              ) : (
                <div
                  onClick={(e) => e.stopPropagation()}
                  className={`w-9 h-9 rounded-full cursor-default ${
                    isLoading
                      ? "bg-neutral-300 animate-pulse"
                      : "bg-[var(--color-neutral-4)]"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
