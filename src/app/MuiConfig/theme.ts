import { unstable_createMuiStrictModeTheme as createMuiTheme } from '@material-ui/core/styles';

export const BaseTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#fca42d',
      contrastText: '#fff',
    },
  },
  typography: {
    h1: {
      fontSize: 42,
      color: '#424242',
      letterSpacing: 0.33,
    },
    h2: {
      fontSize: 22,
      color: '#424242',
      letterSpacing: 0.33,
    },
  },
  props: {
    MuiButton: {
      disableFocusRipple: true,
      disableRipple: true,
    },
  },
});

export default BaseTheme;
