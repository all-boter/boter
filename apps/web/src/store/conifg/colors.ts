interface IPalette {
  neutralLighterAlt: string;
  neutralLighter: string;
  neutralLight: string;
  neutralQuaternaryAlt: string;
  neutralQuaternary: string;
  neutralTertiaryAlt: string;
  neutralTertiary: string;
  neutralSecondary: string;
  neutralPrimaryAlt: string;
  neutralPrimary: string;
  neutralDark: string;
  black: string;
  white: string;
  themePrimary: string;
  themeLighterAlt: string;
  themeLighter: string;
  themeLight: string;
  themeTertiary: string;
  themeSecondary: string;
  themeDarkAlt: string;
  themeDark: string;
  themeDarker: string;
  accent: string;
  blackTranslucent40?: string
  neutralSecondaryAlt?: string
  whiteTranslucent40?: string
  yellowDark?: string
  yellow?: string
  yellowLight?: string
  orange?: string
  orangeLight?: string
  orangeLighter?: string
  redDark?: string
  red?: string
  magentaDark?: string
  magenta?: string
  magentaLight?: string
  purpleDark?: string
  purple?: string
  purpleLight?: string
  blueDark?: string
  blueMid?: string
  blue?: string
  blueLight?: string
  tealDark?: string
  teal?: string
  tealLight?: string
  greenDark?: string
  green?: string
  greenLight?: string
}

export const LightTheme: { palette: IPalette } = {
  palette: {
    "themeDarker": "#004578",
    "themeDark": "#005a9e",
    "themeDarkAlt": "#106ebe",
    "themePrimary": "#0078d4",
    "themeSecondary": "#2b88d8",
    "themeTertiary": "#71afe5",
    "themeLight": "#c7e0f4",
    "themeLighter": "#deecf9",
    "themeLighterAlt": "#eff6fc",
    "black": "#000000",
    "blackTranslucent40": "rgba(0,0,0,.4)",
    "neutralDark": "#201f1e",
    "neutralPrimary": "#323130",
    "neutralPrimaryAlt": "#3b3a39",
    "neutralSecondary": "#605e5c",
    "neutralSecondaryAlt": "#8a8886",
    "neutralTertiary": "#a19f9d",
    "neutralTertiaryAlt": "#c8c6c4",
    "neutralQuaternary": "#d2d0ce",
    "neutralQuaternaryAlt": "#e1dfdd",
    "neutralLight": "#edebe9",
    "neutralLighter": "#f3f2f1",
    "neutralLighterAlt": "#faf9f8",
    "accent": "#0078d4",
    "white": "#ffffff",
    "whiteTranslucent40": "rgba(255,255,255,.4)",
    "yellowDark": "#d29200",
    "yellow": "#ffb900",
    "yellowLight": "#fff100",
    "orange": "#d83b01",
    "orangeLight": "#ea4300",
    "orangeLighter": "#ff8c00",
    "redDark": "#a4262c",
    "red": "#e81123",
    "magentaDark": "#5c005c",
    "magenta": "#b4009e",
    "magentaLight": "#e3008c",
    "purpleDark": "#32145a",
    "purple": "#5c2d91",
    "purpleLight": "#b4a0ff",
    "blueDark": "#002050",
    "blueMid": "#00188f",
    "blue": "#0078d4",
    "blueLight": "#00bcf2",
    "tealDark": "#004b50",
    "teal": "#008272",
    "tealLight": "#00b294",
    "greenDark": "#004b1c",
    "green": "#107c10",
    "greenLight": "#bad80a"
  },
}

export const DarkTheme: { palette: IPalette } = {
  palette: {
    neutralLighterAlt: '#282828',
    neutralLighter: '#313131',
    neutralLight: '#3f3f3f',
    neutralQuaternaryAlt: '#484848',
    neutralQuaternary: '#4f4f4f',
    neutralTertiaryAlt: '#6d6d6d',
    neutralTertiary: '#c8c8c8',
    neutralSecondary: '#d0d0d0',
    neutralPrimaryAlt: '#dadada',
    neutralPrimary: '#ffffff',
    neutralDark: '#f4f4f4',
    black: '#f8f8f8',
    white: '#1f1f1f',
    themePrimary: '#3a96dd',
    themeLighterAlt: '#020609',
    themeLighter: '#091823',
    themeLight: '#112d43',
    themeTertiary: '#235a85',
    themeSecondary: '#3385c3',
    themeDarkAlt: '#4ba0e1',
    themeDark: '#65aee6',
    themeDarker: '#8ac2ec',
    accent: '#3a96dd',
  },
}
