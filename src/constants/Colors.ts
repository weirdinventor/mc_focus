const pallete = {
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',

  white80: '#FFFFFF80',
  whiteSand50: '#F5F5F4',
  wildSand200: '#DDDDDA',

  black30: '#00000030',
  black40: '#00000040',
  black60: '#00000060',
  black90: '#00000090',

  primaryWhite: '#FFFFFF',
  primaryBlack: '#01080a',

  deepRed: '#FF0000',
  red: '#CF6464',
  deepGreen: '#24FF00',
  green: '#4BB543',

  black1: '#202020',
  grey1: '#e3e3e3',
  grey2: '#424242',
  grey3: '#E3DEEA',
  grey4: '#F0F0EE',
  grey5: '#56564E',
  grey6: '#9D9C93',
  grey7: '#E9E9E8',
  grey8: '#818176',
  grey9: '#696860',
  grey10: '#D9D9D9',
  grey11: '#C0BFB9',

  seanceWhite: '#FDF2E9',
  seance100: '#FEF7ED',
  seance400: '#F4B951',
  seance400_50: '#F4B95150',
  seance600: '#E79C1C',
  seance700: '#E79C1C',
  seance800: '#D18B15',
  seance900: '#405c57ff',
  seance950: '#E79C1C',
  sharpPink: '#E79C1C',
  wildSand950: '#2A2A27',

  iconInactive: '#9C9C9C',
  iconActive: '#405c57ff',
} as const;

export const Colors = {
  ...pallete,
  backgroundWhite: pallete.whiteSand50,
  backgroundBlack: pallete.primaryBlack,

  seperator: pallete.primaryBlack,

  textInput: {
    light: {
      main: pallete.grey7,
    },
    dark: {
      main: pallete.primaryWhite,
    },
  },

  texts: {
    light: {
      black: pallete.primaryBlack,
      white: pallete.primaryWhite,
      white80: pallete.white80,
      grey: pallete.grey8,
      grey5: pallete.grey5,
      grey6: pallete.grey6,
      grey9: pallete.grey9,
      pink: pallete.sharpPink,
      pink700: pallete.seance700,
      deepRed: pallete.deepRed,
      seance800: pallete.seance800,
      grey11: pallete.grey11,
      wildSand950: pallete.wildSand950,
    },

    dark: {
      black: pallete.primaryWhite,
      white: pallete.primaryBlack,
      white80: pallete.white80,
      grey: pallete.grey8,
      grey5: pallete.grey5,
      grey6: pallete.grey6,
      grey9: pallete.grey9,
      pink: pallete.sharpPink,
      pink700: pallete.seance700,
      deepRed: pallete.deepRed,
      seance800: pallete.seance800,
      grey11: pallete.grey11,
      wildSand950: pallete.wildSand950,
    },
  },

  buttons: {
    primaryBorder: pallete.grey3,
    whiteBorder: pallete.white,
    light: {
      primary: pallete.white,
      secondary: pallete.grey4,
      colored: pallete.transparent,
      transparent: pallete.transparent,
      seance: pallete.seance400_50,
      seanceFull: pallete.seance700,
    },
    dark: {
      primary: pallete.primaryBlack,
      secondary: pallete.primaryBlack,
      colored: pallete.transparent,
      transparent: pallete.transparent,
      seance: pallete.seance400_50,
      seanceFull: pallete.seance700,
    },
  },

  gradients: {
    main: ['#E79C1C', '#405c57ff', '#000000', '#000000'],
    mainDarker: ['#000000', '#000000', '#000000', '#405c57ff', '#E79C1C'],
    purpleTransparent: ['#000000f0', '#405c571a'],
    purpleToFullTransparent: ['transparent', '#405c57ff'],
    premium: [
      '#955D08',
      '#D19843',
      '#F5BC67',
      '#A16813',
      '#A16813',
      '#FEC672',
      '#D9A04B',
    ],
    redExit: [
      '#B84B4B',
      '#FFB9B9',
      '#D86B6B',
      '#D86B6B',
      '#AB3E3E',
      '#AB3E3E',
      '#D86B6B',
      '#BC5050',
    ],
    error: ['red', 'red'],
    blacToWhiteTransparent: ['#FFFFFF80', '#00000080'],
    blackToFullTransparent: ['transparent', '#00000080'],
  },
};
