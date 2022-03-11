import { format } from "date-fns";
import styled from "styled-components";
import { iGitHubDay } from "../interface/iGitHub";
import { getDateFromNumbers } from "../util/date";

export const Day = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 100%;
  border-radius: 3px;

  text-transform: uppercase;
  font-size: 11px;

  &.level-0 {
    background-color: #e2e2e2;
  }
  &.level-1 {
    background-color: #d7e0ad;
  }
  &.level-2 {
    background-color: #d1e47f;
  }
  &.level-3 {
    background-color: #cdeb4b;
  }
  &.level-4 {
    background-color: #c4e921;
  }
`;

export function GitHubDay({
  item: day,
  data,
}: {
  item: iGitHubDay;
  data: any;
}) {
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
