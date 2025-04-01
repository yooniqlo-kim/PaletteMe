import { useNavigate } from "react-router-dom";
import { getTodayString } from "@/shared/utils/date";
import placeholder_40x40 from "@/assets/images/placeholder-art-light-40x40.jpg";

type CalendarDay = {
  date: string;
  artworkId?: string;
  imageUrl?: string;
  commentId?: string;
};

interface WeeklyCalendarProps {
  data: CalendarDay[];
  onClick?: () => void; // 전체 캘린더 클릭 → 월간 보기로 이동
}

export default function WeeklyCalendar({ data, onClick }: WeeklyCalendarProps) {
  const navigate = useNavigate();
  const weekdays = ["월", "화", "수", "목", "금", "토", "일"];

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
          const day = data[idx];
          const hasComment = day && !!day.commentId;

          return (
            <div key={idx} className="flex flex-col items-center space-y-1">
              <span className="text-xs">{weekday}</span>

              {hasComment ? (
                <div
                  onClick={(e) => {
                    e.stopPropagation(); // 캘린더 전체 클릭 막고 감상문만 이동
                    navigate(`/comment/${day.commentId}`);
                  }}
                  className="w-9 h-9 rounded-full border-4 overflow-hidden cursor-pointer"
                  style={{ borderColor: "var(--color-secondary-hover)" }}
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
                  onClick={(e) => e.stopPropagation()} // 클릭 막기
                  className="w-9 h-9 rounded-full bg-neutral-300 cursor-default"
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
