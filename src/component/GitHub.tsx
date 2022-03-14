import { useDataSource } from "../hook/useDataSource";
import { endpointResource } from "../util/resource";
import { Loader } from "./Loader";
import { getWeek, getDay } from "date-fns";
import styled from "styled-components";
import { ListItems, UnorderedList } from "./ListItems";
import { GitHubWeek } from "./GitHubWeek";
import { GHWeek } from "../interface/GH";
import { GitHubHeaders } from "./GitHubHeaders";
import { Error } from "./Error";
import { fadeIn } from "../style/utils";

const NUMBER_OF_WEEKS = 6;

const Wrapper = styled.div`
  ${fadeIn}

  display: flex;
  height: 100%;
`;

const WeekList = styled(UnorderedList)`
  display: grid;
  grid-template-columns: repeat(${NUMBER_OF_WEEKS}, 22px);
`;

export function GitHub() {
  const data: any = useDataSource(endpointResource("/api/github"));

  return data === null ? (
    <Loader />
  ) : !data ? (
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

function getActivity(weeks: GHWeek[]): GHWeek[] {
  // NOTE: GitHub seems to be using Western Traditional week system

  let payload;
  const date = new Date();
  const dateWeek = getWeek(date);
  const dateDay = getDay(date);

  // keep only N number os weeks
  payload = weeks.slice(dateWeek - NUMBER_OF_WEEKS, dateWeek);
  // removed days to come from the last week
  payload[payload.length - 1].days.splice(dateDay + 1);

  return payload;
}
