import { keyframes, css } from "styled-components";

export const kfFadeIn = keyframes`
    0% { opacity: 0; }
    100%   { opacity: 1; }
`;

export const fadeIn = css`
  opacity: 0;
  animation: ${kfFadeIn} linear 500ms;
  animation-fill-mode: forwards;
`;
