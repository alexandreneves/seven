import styled from "styled-components";
import { iGitHubWeek } from "../interface/iGitHub";
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

export function GitHubWeek({ item: week }: { item: iGitHubWeek; data: any }) {
  return (
    <DayList>
      <ListItems
        items={week.days}
        payload={{ week: week.week }}
        component={GitHubDay}
      />
    </DayList>
  );
}
