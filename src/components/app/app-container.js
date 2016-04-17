import React from 'react';

import { Router, Route, hashHistory } from 'react-router';

import ProjectsContainer from './../projects/projects-container';
import BlogContainer from './../blog/blog-container';
import AboutContainer from './../about/about-container';

import HeaderContainer from './/header/header-container';


const AppContainer = () => (
  <div>
    <HeaderContainer />

    <Router history={hashHistory}>
      <Route path="/" component={BlogContainer} />
      <Route path="/projects" component={ProjectsContainer} />
      <Route path="/about" component={AboutContainer} />
    </Router>
  </div>
);

export default AppContainer;
