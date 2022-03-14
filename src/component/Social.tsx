import styled from "styled-components";

const List = styled.ul`
  list-style: none;

  display: flex;

  margin-right: auto;
  padding: 0;
`;

const Item = styled.li`
  margin-right: 8px;

  &:last-child {
    margin-right: 0;
  }
`;

export function Social() {
  return (
    <List>
      <Item>
        <a href="//github.com/alexandreneves" target="_blank">
          <i className="fa-brands fa-github"></i>
        </a>
      </Item>
      <Item>
        <a href="//linkedin.com/in/alexandredasneves" target="_blank">
          <i className="fa-brands fa-linkedin"></i>
        </a>
      </Item>
      <Item>
        <a href="//instagram.com/aneves" target="_blank">
          <i className="fa-brands fa-instagram"></i>
        </a>
      </Item>
    </List>
  );
}
