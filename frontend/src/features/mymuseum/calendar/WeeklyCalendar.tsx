import { useNavigate } from "react-router-dom";
import { getTodayString } from "@/shared/utils/date";

type CalendarDay = {
  date: string;
  artworkId?: string;
  imageUrl?: string;
  commentId?: string;
};

interface WeeklyCalendarProps {
  data: CalendarDay[];
  onClick?: () => void;
}

export default function WeeklyCalendar({ data, onClick }: WeeklyCalendarProps) {
  const navigate = useNavigate();
  const weekdays = ["월", "화", "수", "목", "금", "토", "일"];

  return (
    <div
      onClick={onClick} // 달력 클릭 시 월간 달력 페이지로
      className="w-full max-w-[23.75rem] h-[10.75rem] rounded-xl px-4 py-3 cursor-pointer"
      style={{ backgroundColor: "#FFEFEF" }}
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
                    e.stopPropagation(); // 감상문 상세 이동만!
                    navigate(`/comment/${day.commentId}`);
                  }}
                  className="w-9 h-9 rounded-full border-4 overflow-hidden cursor-pointer"
                  style={{ borderColor: "var(--color-secondary-hover)" }}
                >
                  <img
                    src={day.imageUrl}
                    alt={`${day.date} 감상문 대표 이미지`}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              ) : (
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="w-9 h-9 rounded-full bg-neutral-400 cursor-default"
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
