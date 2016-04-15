import React from 'react';
import { Router, Route, hashHistory } from 'react-router';
import { render } from 'react-dom';

import ProjectsContainer from './components/projects/projects-container';
import BlogContainer from './components/blog/blog-container';
import AboutContainer from './components/about/about-container';

import 'normalize.css';
import './index.scss';

render((
  <Router history={hashHistory}>
    <Route path="/" component={BlogContainer} />
    <Route path="/projects" component={ProjectsContainer} />
    <Route path="/about" component={AboutContainer} />
  </Router>
), document.getElementById('app'));
