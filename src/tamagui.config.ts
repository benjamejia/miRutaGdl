import { config as defaultConfig } from '@tamagui/config';
import { createTamagui } from 'tamagui';

export const tamaguiConfig = createTamagui({
  ...defaultConfig,
  themeClassNameOnRoot: true,
  tokens: {
    ...defaultConfig.tokens,
    color: {
      ...defaultConfig.tokens?.color,
      momentumOrange: '#FF6B00',
      momentumOrangeDim: '#893600',
      momentumOrangeLight: '#FFF0EA',
      momentumOrangeContainer: '#FF7A2F',
      worldCupPurple: '#6200EE',
      worldCupPurpleDim: '#5D00E3',
      worldCupPurpleLight: '#F7F0FF',
      worldCupPurpleContainer: '#D9CAFF',
      tertiaryGreen: '#026948',
      tertiaryGreenContainer: '#A5FACF',
    },
  },
  themes: {
    light: {
      ...defaultConfig.themes?.light,
      background: '#F6F6F9',
      backgroundStrong: '#FFFFFF',
      backgroundSoft: '#F0F0F3',
      color: '#2D2F31',
      colorHover: '#5A5C5E',
      borderColor: '#757779',
      primary: '#FF6B00',
      primaryLight: '#FFF0EA',
      primaryContainer: '#FF7A2F',
      secondary: '#6200EE',
      secondaryLight: '#F7F0FF',
      secondaryContainer: '#D9CAFF',
      tertiary: '#026948',
      tertiaryContainer: '#A5FACF',
      surface: '#E7E8EB',
      surfaceLow: '#F0F0F3',
      surfaceLowest: '#FFFFFF',
      surfaceHigh: '#DBDDE0',
      surfaceVariant: '#DBDDE0',
      outline: '#757779',
      outlineVariant: '#C4C6C8',
    },
    dark: {
      ...defaultConfig.themes?.dark,
      background: '#0C0E10',
      backgroundStrong: '#07090B',
      backgroundSoft: '#141618',
      color: '#E1E2E6',
      colorHover: '#A1A3A5',
      borderColor: '#8B8D8F',
      primary: '#FE6B00',
      primaryLight: '#1A0F00',
      primaryContainer: '#893600',
      secondary: '#CCB9FF',
      secondaryLight: '#0A0020',
      secondaryContainer: '#5400CE',
      tertiary: '#97EBC1',
      tertiaryContainer: '#A5FACF',
      surface: '#1A1C1E',
      surfaceLow: '#141618',
      surfaceLowest: '#07090B',
      surfaceHigh: '#252729',
      surfaceVariant: '#2D2F31',
      outline: '#8B8D8F',
      outlineVariant: '#444648',
    },
  },
});

export type Conf = typeof tamaguiConfig;

declare module 'tamagui' {
  interface TamaguiCustomConfig extends Conf {}
}

export default tamaguiConfig;
