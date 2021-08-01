import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  :root {
    --dark-side: #2A2A2A;
    --light-side: #FBFE63;
    --primary: #2C97D1;
    --danger: #A94442;
    --white: #FFFFFF;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    @media (max-width: 1080px) {
      font-size: 93.75%; // 15px
    }

    @media (max-width: 720px) {
      font-size: 87.5%; // 14px
    }
  }

  html, body {
    height: 100%;
  }

  body {
    -webkit-font-smoothing: antialiased;
  }

  body, button, input, textarea {
    font-family: 'Montserrat', sans-serif;
    font-weight: 400;
  }

  button {
    cursor: pointer;
  }

  [disabled] {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
