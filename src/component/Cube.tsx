import styled from "styled-components";

const Content = styled.div`
  position: relative;

  overflow: hidden;

  width: 200px;
  height: 200px;

  padding: 10px;

  background-color: white;
  box-shadow: 2px 2px 0 0 rgb(0 0 0 / 25%);
  border-radius: 3px;
`;

const Title = styled.h2`
  text-transform: uppercase;
  text-align: right;
  font-size: 10px;
  margin: 0 5px;
  font-weight: 400;
`;

export function Cube(props: any) {
  return (
    <>
      <Title>{props.title}</Title>
      <Content>{props.children}</Content>
    </>
  );
}
