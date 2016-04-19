import React from 'react';
import { connect } from 'react-redux';

import Header from './header';

@connect(
  (state) => ({ navigation: state.navigation })
)
export default class HeaderContainer extends React.Component {
  propTypes: {
    navigation: React.PropTypes.object,
  };

  render() {
    return (
      <Header navigation={this.props.navigation} />
    );
  }
}
