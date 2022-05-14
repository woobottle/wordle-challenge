import { createGlobalStyle } from "styled-components";
import reset from 'styled-reset';
import { colorTheme } from "./theme";

interface themeProps {
  currentTheme: colorTheme;
  setTheme: void;
}

const GlobalStyles = createGlobalStyle<{ theme: themeProps }>`
  ${reset}
  
  body {
    font-family: 'Noto Sans KR', 'Apple SD Gothic Neo', sans-serif;
    background-color: ${({ theme }) => theme?.currentTheme.bgColor};
    color: ${({ theme }) => theme?.currentTheme.textColor};
    font-size: 16px;
  }

  @media only screen and (max-width: 784px) {
    body {
      font-size: 14px;
    }
  }

  @media only screen and (max-width: 414px) {
    body {
      font-size: 10px;
    }
  }
`;

export default GlobalStyles;