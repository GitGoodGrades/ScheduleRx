import React from 'react';

export const styles = theme => ({
    root: {
        width: '100%',
        zIndex: 1,
        height: '100%',
        overflow: 'hidden',

    },
    appFrame: {
        position: 'relative',
        display: 'inline',
        width: '100%',
        height: '100%',
        border: '4px solid yellow',
    },
    content: {
        backgroundColor: theme.palette.background.default,
        width: '100%',
        display:'inline',
        position: 'relative',
        padding: theme.spacing.unit * 3,
        height: '100%',
        marginTop: 56,
        [theme.breakpoints.up('sm')]: {
            height: 'calc(100% - 64px)',
            marginTop: 64,

        },
        overflow: 'auto',

    },
    gridRoot: {
        height: '100%',
        minHeight: 900,
        border: '4px solid yellow',
    },
    buttonwrapper: {
        border: '',
        padding: 10,
        textAlign: 'center',
    },
    regbutton: {
        margin: 'auto',
        backgroundColor: 'white',
        border: 'none',
        color: 'rgb(111, 0, 41)',
    },
});
