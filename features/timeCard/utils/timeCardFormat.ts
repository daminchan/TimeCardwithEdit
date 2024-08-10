import { format, differenceInMinutes } from 'date-fns';
import { ja } from 'date-fns/locale';

export const formatDateWithDayOfWeek = (date: Date) =>
  format(date, 'yyyy/MM/dd (E)', { locale: ja });

export const formatTimeHHMM = (date: Date) =>
  format(date, 'HH:mm', { locale: ja });

export const calculateWorkTimeInMinutes = (
  start: Date,
  end: Date,
  breakDuration: number | null
) => {
  let diffMinutes = differenceInMinutes(end, start);
  if (breakDuration) {
    diffMinutes -= breakDuration;
  }
  return diffMinutes;
};

export const formatWorkTimeToHoursAndMinutes = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}時間${mins}分`;
};
