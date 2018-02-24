import React from 'react';
import { MuiThemeProvider } from 'material-ui/styles';
import { Route, Switch } from 'react-router-dom';
import Shell from './Shell';
import { ulmTheme as theme } from '../../theme';

const App = () =>
  (
    <MuiThemeProvider theme={theme}>
      <Switch>
        <Route path="/" component={Shell} />
      </Switch>
    </MuiThemeProvider>
  );

export default App;