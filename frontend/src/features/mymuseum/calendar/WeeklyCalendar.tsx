import { getTodayString } from '@/shared/utils/date';

type CalendarDay = {
  day: string; // '월', '화', ...
  hasDiary: boolean;
  imageUrl?: string;
};

interface WeeklyCalendarProps {
  data: CalendarDay[];
}

export default function WeeklyCalendar({ data }: WeeklyCalendarProps) {
  return (
    <div
      className="w-full max-w-[23.75rem] h-[10.75rem] rounded-xl px-4 py-3"
      style={{ backgroundColor: '#FFEFEF' }}
    >
      <h2 className="text-center text-base font-semibold mb-4 py-3">
        {getTodayString()}
      </h2>
      <div className="grid grid-cols-7 gap-2 px-2">
        {data.map((day, idx) => (
          <div key={idx} className="flex flex-col items-center space-y-1">
            <span className="text-xs">{day.day}</span>
            {day.hasDiary ? (
              <div
                  className="w-9 h-9 rounded-full border-4 overflow-hidden"
                  style={{ borderColor: 'var(--color-secondary-hover)' }}
                >
                <img
                  src={day.imageUrl}
                  alt={`${day.day} 감상문 이미지`}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            ) : (
              <div
                className="w-9 h-9 rounded-full"
                style={{ backgroundColor: '#FFBBBB' }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
