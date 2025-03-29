import MonthlyCalendar from '@/features/mymuseum/calendar/MonthlyCalendar';

export default function CalenderPage() {
  return (
    <div className="p-4">
      <MonthlyCalendar
        selectedDate={new Date()}
        onBackToWeek={() => {
          // 뒤로가기 버튼 누르면 마이뮤지엄으로
          window.history.back();
        }}
      />
    </div>
  );
}
