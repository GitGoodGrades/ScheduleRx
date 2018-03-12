import React from 'react';
import { MuiThemeProvider } from 'material-ui/styles';
import { Route, Switch, Router } from 'react-router-dom';
import Shell from './Shell/Shell';
import { ulmTheme as theme } from '../MaterialUI/theme/index';
import Logging from './Auth/scenes/logging';
import Registration from './Auth/scenes/registration';

const App = () =>
    (
        <MuiThemeProvider theme={theme}>
            <Switch>
                <Route exact path="/login" component={Logging}/>
                <Route exact path="/Register" component={Registration}/>
                <Route path="/" component={Shell}/>
            </Switch>
        </MuiThemeProvider>
    );

export default App;