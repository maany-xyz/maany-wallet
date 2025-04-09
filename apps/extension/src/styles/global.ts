import { createGlobalStyle } from "styled-components";
import { normalize } from "styled-normalize";
import { ColorPalette } from "./colors";
import * as KeplrWalletPrivate from "keplr-wallet-private";

export const GlobalStyle = createGlobalStyle`
  ${normalize}
  
  ${KeplrWalletPrivate.GlobalStyles}
  
  /* Font import */
  @font-face {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    src: url('/fonts/Inter-Regular.woff2') format('woff2');
  }
  
  html {
    // TODO: Change the scheme according to theme after theme feature is implemented.
    color-scheme: ${(props) =>
      props.theme.mode === "light" ? "light" : "dark"};
  }
  
  html, body {
    font-family: 'Maany', sans-serif;
    -webkit-font-smoothing: antialiased;
    
    &[data-lang="ko"] {
      font-family: 'NotoSansKR', sans-serif;
      
      word-break: keep-all;
      word-wrap: break-word;
    }
    color: ${(props) =>
      props.theme.mode === "light"
        ? ColorPalette["gray-700"]
        : ColorPalette.white};
    background: ${(props) =>
      props.theme.mode === "light"
        ? ColorPalette["light-gradient"]
        : ColorPalette["gray-700"]};

    &[data-white-background="true"] {
      background: ${(props) =>
        props.theme.mode === "light"
          ? ColorPalette.white
          : ColorPalette["gray-700"]};
    }
  }
  
  pre {
    font-family: 'Inter', sans-serif;
    -webkit-font-smoothing: antialiased;
    font-weight: 400;
    font-size: 0.8125rem;
    color: ${ColorPalette["gray-200"]};

    &[data-lang="ko"] {
      font-family: 'NotoSansKR', sans-serif;
    }
  }

  // Set border-box as default for convenience.
  html {
    box-sizing: border-box;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  
  * {
    font-feature-settings: "calt" 0
  }
`;
