import { format } from "date-fns";
import styled from "styled-components";
import { GHDay } from "../interface/GH";
import { getDateFromNumbers } from "../util/date";

export const Day = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 100%;
  border-radius: 3px;

  border: 1px solid rgba(0 0 0 / 5%);

  text-transform: uppercase;
  font-size: 11px;

  &.level-0 {
    background-color: #f2ebf7;
  }
  &.level-1 {
    background-color: #dfdae8;
  }
  &.level-2 {
    background-color: #c9bbdc;
  }
  &.level-3 {
    background-color: #9e82ae;
  }
  &.level-4 {
    background-color: #62397a;
  }
`;

interface GitHubDayProps {
  item: GHDay;
  data: any;
}

export function GitHubDay({ item: day, data }: GitHubDayProps) {
  const dayNumber = data.index;
  const weekNumber = data.payload.week;

  return (
    <Day
      className={`level-${getLevel(day.count)}`}
      title={getTitle(weekNumber, dayNumber, day.count)}
    ></Day>
  );
}

function getTitle(week: number, day: number, count?: number): string {
  const payload = [];
  const date = format(
    getDateFromNumbers(new Date().getFullYear(), week, day),
    "LLL dd, yyyy"
  );

  payload.push(
    !count
      ? "no contributions"
      : `${count} contribution${count === 1 ? "" : "s"}`
  );

  payload.push(`on ${date}`);

  return payload.join(" ");
}

function getLevel(count = 0): number {
  if (count === 0) return 0;
  if (count < 5) return 1;
  if (count < 9) return 2;
  if (count < 13) return 3;
  return 4;
}
