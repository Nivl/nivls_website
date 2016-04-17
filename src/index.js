import React from 'react';
import { render } from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';

import 'normalize.css';
import './index.scss';

injectTapEventPlugin();

import AppContainer from './components/app/app-container';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: '#56b0e5',
  },
  appBar: {
    height: 50,
  },
});

render((
  <MuiThemeProvider muiTheme={muiTheme}>
    <AppContainer />
  </MuiThemeProvider>),
  document.getElementById('app'));
