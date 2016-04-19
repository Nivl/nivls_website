import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';

import 'normalize.css';
import './index.scss';

injectTapEventPlugin();

import AppContainer from './app/components/app-container';

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


import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import ProjectsContainer from './projects/components/projects-container';
import BlogContainer from './blog/components/blog-container';
import AboutContainer from './about/components/about-container';

import store from './app/store';

render((
  <Provider store={store}>
    <MuiThemeProvider muiTheme={muiTheme}>

      <Router history={hashHistory}>

        <Route path="/" component={AppContainer}>
          <IndexRoute component={BlogContainer} />

          <Route path="projects" component={ProjectsContainer} />
          <Route path="about" component={AboutContainer} />
        </Route>

        {/* TODO: 404 */}
        {/* <Route path="*" component={BlogContainer} /> */}
      </Router>
    </MuiThemeProvider>
  </Provider>),
  document.getElementById('app'));
