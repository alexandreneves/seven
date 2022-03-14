import styled from "styled-components";
import { ListItems, UnorderedList } from "./ListItems";

const Header = styled(UnorderedList)`
  display: grid;
  grid-auto-rows: minmax(0, 1fr);

  li {
    display: flex;
    justify-content: center;
    align-items: center;

    font-size: 11px;
    text-transform: uppercase;
  }
`;

export function GitHubHeaders() {
  const labels = [
    undefined,
    "mon",
    undefined,
    "wed",
    undefined,
    "fri",
    undefined,
  ];

  // @ts-ignore
  return (
    <Header>
      <ListItems
        items={labels}
        component={({ item }: { item: string }) => <div>{item}</div>}
      />
    </Header>
  );
}
