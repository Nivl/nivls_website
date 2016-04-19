import React from 'react';

import { updateNavigation } from '../../app/actions/navigation-actions';
import store from '../../app/store';

export default class ProjectsContainer extends React.Component {
  componentDidMount() {
    store.dispatch(updateNavigation({ title: 'Portfolio' }));
    console.log('projects mounted');
  }

  render() {
    console.log('projects rendered');
    return (<div>Projects</div>);
  }
}
