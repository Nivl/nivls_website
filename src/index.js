import React from 'react';
import { Router, Route, hashHistory } from 'react-router';
import { render } from 'react-dom';

import Main from './components/main';
import Projects from './components/projects';
import Blog from './components/blog';
import About from './components/about';

render((
  <Router history={hashHistory}>
    <Route path="/" component={Main} />
    <Route path="/projects" component={Projects} />
    <Route path="/about" component={About} />
  </Router>
), document.getElementById('app'));
