import React from 'react';
import HeaderContainer from './header/header-container';

export default class AppContainer extends React.Component {
  construct() {
  }

  render() {
    console.log('app');

    return (
      <div>
        <HeaderContainer />

        { this.props.children }
      </div>
    );
  }
}
