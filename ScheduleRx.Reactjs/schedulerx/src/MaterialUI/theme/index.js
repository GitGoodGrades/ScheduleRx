import 'typeface-open-sans';
import React from 'react';
import {MuiThemeProvider, createMuiTheme } from 'material-ui/styles';

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
        },
        acccent: {
            main: 'black'
        },
        transBlack: {
            main: 'rgba(0,0,0, .8)'
        }
    }
};


export const ulmTheme = createMuiTheme({
  ...baseTheme, ...schoolPalette,
    
  
});



