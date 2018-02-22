import purple from 'material-ui/colors/purple';
import blue from 'material-ui/colors/blue';
import red from 'material-ui/colors/red';
import blueGrey from 'material-ui/colors/blueGrey';

import { createMuiTheme } from 'material-ui/styles';

const baseTheme = {
  overrides: {
    MuiDrawer: {
      docked: {
        flex: '0 0 auto',
        height: '100%',
      },
    },
  },
  drawerWidth: 240
};

const schoolPalette = {
  palette: {
    primary: {
        light: '#bf443f',
        main: '#890a18',
        dark: '#560000',
        contrastText: '#fff',
      },
    secondary: {
      ...blueGrey,
      A400: '#00e677',
    },
    error: red,
  },
};


export const ulmTheme = createMuiTheme({
  ...baseTheme, ...schoolPalette,
});
