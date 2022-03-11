import { addWeeks, addDays } from "date-fns";

export function getDateFromNumbers(
  year: number,
  week: number,
  day: number
): Date {
  let date = new Date(year, 0, 1); // 01/01/{year}
  date = addWeeks(date, week - 1); // -1 to exclude current unfinised week
  date = addDays(date, day + 1); // +1 because of zero index (0-6)
  return date;
}
