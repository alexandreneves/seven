import { createGlobalStyle, css } from "styled-components";
import bg from "../image/bg.jpg";

const globals = css`
  @import url("https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@100;200;300;400;500;600;700&family=Roboto+Mono:wght@300;400;500&display=swap");

  * {
    box-sizing: border-box;
  }

  html,
  body {
    width: 100%;
    height: 100%;

    margin: 0;
    padding: 0;
  }

  p {
    margin: 0;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  i {
    font-style: normal;
  }

  body {
    display: flex;
    justify-content: center;
    align-items: center;

    background: url(${bg});
    background-size: cover;

    color: #444;
    font-family: "IBM Plex Sans", sans-serif;
    font-weight: 300;
    font-size: 14px;
    -webkit-font-smoothing: antialiased;
  }
`;

export const Elements = createGlobalStyle`
  // doing it this way to allow formatting
  ${globals}
`;
