import React from 'react';

import { updateNavigation } from '../../app/actions/navigation-actions';
import store from '../../app/store';


export default class BlogContainer extends React.Component {
  componentDidMount() {
    console.log('Blog mounted');
    store.dispatch(updateNavigation({ title: 'Blog', color: '#56b0e5' }));
  }

  render() {
    console.log('Blog rendered');

    return (<div>Blog</div>);
  }
}
