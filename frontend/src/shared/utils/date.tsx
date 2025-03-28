// shared/utils/date.ts

import dayjs from 'dayjs';
import 'dayjs/locale/ko';

dayjs.locale('ko');

// calendar용 
export const getTodayString = () => {
  return dayjs().format('M월 D일 dddd');
};

// wrapped 타이틀용
export const getWrappedMonthString = () => {
  return dayjs().subtract(1, 'month').format('YYYY년 M월');
};

