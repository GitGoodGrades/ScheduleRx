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
        <Route path="/" component={Shell} />
        <Route path="/login" component={Logging}/>
        <Route path="/Register" component={Registration}/>
      </Switch>
    </MuiThemeProvider>
  );

export default App;