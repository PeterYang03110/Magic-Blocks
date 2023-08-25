import { createTheme, responsiveFontSizes } from '@material-ui/core/styles';

const fontFamily = [
  'Inter',
  'Inter-Bold',
  'pedestria-mvb',
  'Rajdhani-Bold',
  'nelson',
  'Arial',
  'Rubik',
  '-apple-system',
  'BlinkMacSystemFont',
  '"Segoe UI"',
  'sans-serif',
  '"Apple Color Emoji"',
  '"Segoe UI Emoji"',
  '"Segoe UI Symbol"',
];

const theme = responsiveFontSizes(
  createTheme({
    typography: {
      fontFamily: fontFamily.join(','),
    },
    overrides: {
      MuiCssBaseline: {
        '@global': {
          '@font-face': [
            {
              fontFamily: 'Inter',
              fontStyle: 'normal',
              fontDisplay: 'swap',
              fontWeight: 400,
              src: `local('Inter'), url('/assets/fonts/Inter.ttf') format('truetype')`,
            },
            {
              fontFamily: 'Inter-Bold',
              fontStyle: 'normal',
              fontDisplay: 'swap',
              fontWeight: 400,
              src: `local('Inter-Bold'), url('/assets/fonts/Inter-Bold.ttf') format('truetype')`,
            },
            {
              fontFamily: 'Rajdhani-Bold',
              fontStyle: 'normal',
              fontDisplay: 'swap',
              fontWeight: 700,
              src: `local('Rajdhani-Bold.ttf'), url('/assets/fonts/Rajdhani-Bold.ttf') format('truetype')`,
            },
          ],
        },
      },
      MuiCard: {
        root: {
          borderRadius: 4,
          boxShadow: 'unset',
        },
      },
      MuiPickersToolbar: {
        toolbar: {
          backgroundColor: '#0B0B0B',
        },
      },
      MuiPickersToolbarText: {
        toolbarTxt: {
          background:
            'radial-gradient(96.45% 105.69% at 0.81% -12.46%, #A4D7FC 1.04%, #A8B4FE 63.02%, #CDB9FD 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          textFillColor: 'transparent',
        },
        toolbarBtnSelected: {
          textTransform: 'uppercase',
          background: '#0B0B0B',
          WebkitBackgroundClip: 'unset',
          WebkitTextFillColor: 'unset',
          backgroundClip: 'unset',
          textFillColor: 'unset',
        },
      },
      MuiPickersDay: {
        day: {
          color: '#1F182A',
          '&:hover': {
            borderRadius: 4,
            background: 'rgba(143, 149, 178, 0.2)',
          },
        },
        daySelected: {
          borderRadius: 4,
          background:
            'radial-gradient(96.45% 105.69% at 0.81% -12.46%, #A4D7FC 1.04%, #A8B4FE 63.02%, #CDB9FD 100%)',
        },
        dayDisabled: {
          color: '#1F182A',
        },
        current: {
          color: '#1F182A',
          fontWeight: 700,
        },
      },
      MuiPickersSlideTransition: {
        transitionContainer: {
          '& p': {
            color: '#1F182A',
            fontWeight: 700,
            textTransform: 'uppercase',
          },
        },
      },
      MuiPickersCalendarHeader: {
        transitionContainer: {
          color: '#1F182A',
        },
      },
      MuiPickersModal: {
        dialogAction: {
          color: '#29316c',
          backgroundColor: '#0B0B0B',
        },
      },
      MuiTabs: {
        indicator: {
          height: 4,
        },
      },
    },
    palette: {
      primary: {
        main: '#797FF2',
        contrastText: '#FFFFFF',
      },
      secondary: {
        main: '#AFECEF',
        contrastText: '#1F182A',
      },
      danger: {
        main: '#FF3D71',
      },
      background: {
        default: '#E0E0E0',
        primary: '#0B0B0B',
        secondary: '#2D2D2D',
        third: 'rgba(11, 11, 11, 0.8)',
        light: 'rgba(11, 11, 11, 0.6)',
        inactive: 'rgba(11, 11, 11, 0.3)',
        purple: 'rgba(121, 127, 242, 0.6)',
        yellow: 'rgba(255, 184, 0, 0.6)',
      },
      text: {
        default: '#C9C9C9',
        primary: '#FFFFFF',
        secondary: '#0B0B0B',
        third: '#5A5A5A',
        grey: '#606060',
        yellow: '#FFB800',
      },
    },
    custom: {
      palette: {
        black20: '#F9FAFC',
        black30: '#EDEFF5',
        black40: '#D8DAE5',
        black60: '#474D66',
        blueLink: '#4D6EFF',
        green50: '#00D68F',
        orange40: '#FBA26E',
        slateBlue10: '#F0F1FE',
        slateBlue20: '#D3D5FB',
        slateBlue50: '#797FF2',
        white: '#FFFFFF',
        lightBlue: '#4283c1',
        blue: '#29316c',
        lightGrey: '#B0B0B0',
        darkGrey: '#222222',
        darkBlue: '#2b2e3f',
        purple: '#5157CC',
        whitePurple: '#8F95B2',
        lightPurple: 'rgba(255, 255, 255, 0.7)',
        green: '#3BC171',
        pink: '#fe03b1',
        lightYellow: '#FFF8EE',
        darkYellow: '#B68300',
        yellow: '#EBD5B3',
        border: '#C9C9C9',
        orange: '#f9b020',
        brown: '#433012',
      },
      gradient: {
        blue: 'linear-gradient(89.97deg, #A29EDB -3.24%, #797FF2 2.14%, #EBD5B3 99.97%, #EBD5B3 99.97%)',
        blueCol: 'linear-gradient(178.59deg, #EBD5B3 -16.93%, #797FF2 98.8%)',
        blueRadial: 'radial-gradient(53.61% 53.61% at 50% 50%, #d3d5fb 0%,  #8085f3 100%)',
        background: 'linear-gradient(119.66deg, #20459d 7.77%, #0397d3 81.36%)',
        yellow: 'linear-gradient(179.97deg, #F2E4CF 38.71%, #FFB800 117.92%)',
        purple:
          'radial-gradient(109.19% 212.5% at 20.94% 113.82%, #9FA4FF 0%, #6C70C6 57.73%, #464A9C 100%, #0A0E66 100%)',
      },
      layout: {
        topAppBarHeight: 64,
        maxFooterWidth: 680,
        maxDeskWidth: 1272,
        maxClaimWidth: 1096,
        minMobileHeight: 730,
        lootfarmsTabBarHeight: 66,
        lootfarmsSideBarWidth: 324,
      },
    },
  }),
);

export default theme;
