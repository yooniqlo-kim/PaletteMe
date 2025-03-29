import dayjs from 'dayjs';
import 'dayjs/locale/ko';

dayjs.locale('ko');

// calendar용 
export const getTodayString = () => {
  return dayjs().format('M월 D일 dddd');
};

export const getMonthCalendarDays = (date: Date): Date[] => {
  const startOfMonth = dayjs(date).startOf('month');
  const endOfMonth = dayjs(date).endOf('month');

  const startDay = startOfMonth.startOf('week'); // 일요일 시작
  const endDay = endOfMonth.endOf('week');

  const days: Date[] = [];
  let current = startDay;

  while (current.isBefore(endDay) || current.isSame(endDay, 'day')) {
    days.push(current.toDate());
    current = current.add(1, 'day');
  }

  return days;
};


// wrapped 타이틀용
export const getWrappedMonthString = () => {
  return dayjs().subtract(1, 'month').format('YYYY년 M월');
};



