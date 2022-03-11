import { FadeIn } from "../style";
import { useDataSource } from "../hook/useDataSource";
import { endpointResource } from "../util/resource";
import { Loader } from "./Loader";
import { getISOWeek, getISODay } from "date-fns";
import styled from "styled-components";
import { ListItems, UnorderedList } from "./ListItems";
import { GitHubWeek } from "./GitHubWeek";
import { iGitHubWeek } from "../interface/iGitHub";
import { GitHubHeaders } from "./GitHubHeaders";
import { Error } from "./Error";

const Wrapper = styled.div`
  ${FadeIn}

  display: flex;
  height: 100%;
`;

const WeekList = styled(UnorderedList)`
  display: grid;
  grid-template-columns: repeat(5, 26px);
`;

export function GitHub() {
  const data: any = useDataSource(
    endpointResource("http://localhost:3001/github")
  );

  return !data ? (
    <Loader />
  ) : data.error ? (
    <Error />
  ) : (
    <Wrapper>
      <GitHubHeaders />
      <WeekList>
        <ListItems items={getActivity(data.data)} component={GitHubWeek} />
      </WeekList>
    </Wrapper>
  );
}

function getActivity(weeks: iGitHubWeek[]): iGitHubWeek[] {
  let payload;
  const date = new Date();
  const dateWeek = getISOWeek(date); // +1 because skyline has index zero, but ISO weeks start with 1
  const dateDay = getISODay(date);
  const numberOfWeeks = 5;

  // keep only N number os weeks
  payload = weeks.slice(dateWeek - numberOfWeeks, dateWeek);
  // removed days to come from the last week
  payload[payload.length - 1].days.splice(dateDay + 1);

  return payload;
}
