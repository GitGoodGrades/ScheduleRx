import 'typeface-open-sans';
import { createMuiTheme } from 'material-ui/styles';

const baseTheme = {
    root: {
        fontFamily: 'Open Sans'
    },
    typography: {
        fontFamily: 'Open Sans'
    }
};


const schoolPalette = {
    palette: {
        secondary: {
            main: '#700e2f'
        },
        primary: {
            main: '#2a1215'
        }
    }
};


export const ulmTheme = createMuiTheme({
  ...baseTheme, ...schoolPalette,
});
