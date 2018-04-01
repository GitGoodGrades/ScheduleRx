import React from 'react';
import { MuiThemeProvider } from 'material-ui/styles';
import { Route, Switch } from 'react-router-dom';
import Shell from './Shell/Shell';
import { ulmTheme as theme } from '../MaterialUI/theme/index';
import Logging from './Auth/scenes/logging';
import Registration from './Auth/scenes/registration';
import MomentUtils from 'material-ui-pickers/utils/moment-utils';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';



const App = () =>
    (
        <MuiThemeProvider theme={theme}>
            <MuiPickersUtilsProvider utils={MomentUtils}>
            <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
                <Switch>
                    <Route exact path="/login" component={Logging}/>
                    <Route exact path="/Register" component={Registration}/>
                    <Route path="/" component={Shell}/>
                </Switch>
            </MuiPickersUtilsProvider>    
        </MuiThemeProvider>
    );

export default App;