import styled from "styled-components";
import { GHWeek } from "../interface/GH";
import { GitHubDay } from "./GitHubDay";
import { ListItems, UnorderedList } from "./ListItems";

const DayList = styled(UnorderedList)`
  list-style: none;
  width: 100%;
  height: 100%;
  padding: 0;

  display: grid;
  grid-template-rows: repeat(7, 1fr);

  li {
    padding: 1px;
  }
`;

interface GitHubWeekProps {
  item: GHWeek;
  data: any;
}

export function GitHubWeek({ item }: GitHubWeekProps) {
  return (
    <DayList>
      <ListItems
        items={item.days}
        payload={{ week: item.week }}
        component={GitHubDay}
      />
    </DayList>
  );
}
