import styled, { keyframes, css } from "styled-components";

export const kfFadeIn = keyframes`
    0% { opacity: 0; }
    100%   { opacity: 1; }
`;

export const FadeIn = css`
  opacity: 0;
  animation: ${kfFadeIn} linear 500ms;
  animation-fill-mode: forwards; 
`;

export const CubeCenteredText = styled.p`
  position: absolute;
  top: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  height: 100%;
  padding: 0 35px;

  font-size: 12px;
  text-transform: uppercase;
`;
