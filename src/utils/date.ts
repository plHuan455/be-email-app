import { eachDayOfInterval, isValid, parse, startOfMonth } from 'date-fns';
import { vi } from 'date-fns/locale';

export function getWeeksInMonth(year: number, month: number) {
  const daysName = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const weeks: Array<{ start: number; end: number }> = [];
  const lastDate = new Date(year, month + 1, 0);

  let start: number = 0;
  let end: number;

  for (let i = 1; i < lastDate.getDate() + 1; i++) {
    if (
      daysName[Number(new Date(year, month, i).getDay())] == 'Sunday' ||
      i == lastDate.getDate()
    ) {
      end = i;
      weeks.push({
        start: start + 1,
        end: end,
      });
      start = i;
    }
  }
  return {
    startDayOfWeek: startOfMonth(new Date(year, month)).getDay(),
    weeks,
    weekDate: weeks.map((val) =>
      eachDayOfInterval({
        start: new Date(year, month, val.start),
        end: new Date(year, month, val.end),
      }),
    ),
  };
}

export function isDateTimeType(dateTimeStr: string): boolean {
  const parseDate = parse(dateTimeStr, 'P', new Date(), { locale: vi });
  return isValid(parseDate);
}
