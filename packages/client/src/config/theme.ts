import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

export default responsiveFontSizes(
  createMuiTheme({
    palette: {
      primary: {
        light: '#718792',
        main: '#455a64',
        dark: '#1c313a',
        contrastText: '#fff',
      },
      secondary: {
        light: '#ff6659',
        main: '#d32f2f',
        dark: '#9a0007',
        contrastText: '#fff',
      },
    },
  }),
);
