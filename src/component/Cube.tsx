import styled from "styled-components";

const DEFAULT_WIDTH_MULTIPLIER = 1;
interface CubeProps {
  title: string;
  widthMultiplier?: number;
  children?: React.ReactNode;
}

const Content = styled.div<Partial<CubeProps>>`
  position: relative;

  overflow: hidden;

  width: ${(p) => `calc(200px * ${p.widthMultiplier})`};
  height: 200px;

  padding: 12px;

  background-color: white;
  box-shadow: 4px 3px 0 0 rgb(255 255 255 / 25%);
  border-radius: 2px;
`;

const Title = styled.h2`
  margin: 0 5px 0 0;

  color: white;
  font-size: 26px;
  font-weight: 600;
  text-transform: uppercase;
  text-align: right;
  line-height: 0.8;
`;

export function Cube({
  title,
  widthMultiplier = DEFAULT_WIDTH_MULTIPLIER,
  children,
}: CubeProps) {
  return (
    <>
      <Title>{title}</Title>
      <Content widthMultiplier={widthMultiplier}>{children}</Content>
    </>
  );
}
