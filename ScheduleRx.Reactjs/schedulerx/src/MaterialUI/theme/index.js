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

  
};


export const ulmTheme = createMuiTheme({
  ...baseTheme, ...schoolPalette,
});
