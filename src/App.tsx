import styled from "styled-components";
import { Track } from "./component/Track";
import { Photo } from "./component/Photo";
import { GitHub } from "./component/GitHub";
import { About } from "./component/About";
import { Cube } from "./component/Cube";

const List = styled.ul`
  list-style: none;
  margin: 0 0 0 0;
  padding: 0;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Item = styled.li`
  margin-right: 10px;

  &:last-child {
    margin: 0;
  }
`;

export function App() {
  return (
    <List>
      <Item>
        <Cube title="about">
          <About />
        </Cube>
      </Item>
      <Item>
        <Cube title="github">
          <GitHub />
        </Cube>
      </Item>
      <Item>
        <Cube title="last still">
          <Photo />
        </Cube>
      </Item>
      <Item>
        <Cube title="listening">
          <Track />
        </Cube>
      </Item>
    </List>
  );
}
