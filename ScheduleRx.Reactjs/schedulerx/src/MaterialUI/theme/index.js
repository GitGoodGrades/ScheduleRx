import 'typeface-open-sans';
import { createMuiTheme } from 'material-ui/styles';

const baseTheme = {
    root: {
        fontFamily: 'Open Sans'
    },
    typography: {
        fontWeight: 'normal'
    },
    MuiChip: {
        fontFamily: 'Open Sans'
    },
    MuiInputLabel: {
        fontFamily: 'Open Sans'
    }

};


const schoolPalette = {


};


export const ulmTheme = createMuiTheme({
  ...baseTheme, ...schoolPalette,
});
