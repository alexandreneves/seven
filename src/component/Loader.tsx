import styled, { keyframes } from "styled-components";

const loaderKeyframes = keyframes`
    0% {
      left: 0;
      transform: translateX(-100%);
    }
    100% {
      left: 100%;
      transform: translateX(0%);
  }
`;

const Wrapper = styled.div`
  overflow: hidden;
  position: relative;

  width: 100%;
  height: 2px;

  &:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;

    background: black;

    animation: ${loaderKeyframes} 2s infinite;
  }
`;

export function Loader() {
  return <Wrapper></Wrapper>;
}
