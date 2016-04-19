import React from 'react';

import { updateNavigation } from '../../app/actions/navigation-actions';
import store from '../../app/store';

export default class AboutContainer extends React.Component {
  componentDidMount() {
    console.log('about mounted');
    store.dispatch(updateNavigation({ title: 'About', color: '#20A3Af' }));
  }

  render() {
    console.log('about rendered');

    return (<div>About</div>);
  }
}
