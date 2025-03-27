import dayjs from 'dayjs';
import 'dayjs/locale/ko';

dayjs.locale('ko');

export const getTodayString = () => {
  return dayjs().format('M월 D일 dddd');
};
