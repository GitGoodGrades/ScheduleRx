import React from 'react';
import { MuiThemeProvider } from 'material-ui/styles';
import { Route, Switch } from 'react-router-dom';
import Shell from './Shell';
import { ulmTheme as theme } from '../../theme';
import Logging from '../Auth/scenes/logging';
import Registration from '../Auth/scenes/registration';

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