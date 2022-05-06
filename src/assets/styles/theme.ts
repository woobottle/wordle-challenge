import { deskTopSize, tabletSize, mobileSize, maxWidth } from '../../constants'

interface deviceType {
  desktop: string;
  tablet: string;
  mobile: string;
}

interface sizeType {
  maxWidth: string;
}

interface ThemeInterface {
  device: deviceType;
  size: sizeType;
}

const theme: ThemeInterface = {
  device: {
    desktop: deskTopSize,
    tablet: tabletSize,
    mobile: mobileSize
  }, 
  size: {
    maxWidth,
  }
} 

export interface colorTheme {
  bgColor: string;
  textColor: string;
}

const light: colorTheme = {
  bgColor: "#eff0f5",
  textColor: "#202124",
};

const dark: colorTheme = {
  bgColor: "#202124",
  textColor: "#eff0f5",
};

export type modeTheme = ThemeInterface & colorTheme;

export const lightTheme = {...light, ...theme}
export const darkTheme = {...dark, ...theme}