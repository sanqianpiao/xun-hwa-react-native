'use strict';

import React, { Component } from 'react-native';
import { bindActionCreators } from 'redux';
import { screenActions } from '../actions';
import { connect } from 'react-redux';

import StartupScreen from '../components/StartupScreen';
import HomeScreen from '../components/HomeScreen';

class AppRoot extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { screen } = this.props;
    switch (screen.currentScreen) {
        case 'startup':
            return <StartupScreen />;
        case 'home':
            return <HomeScreen />;
        default:
            return <StartupScreen />;
    }
  }
}

export default connect(store => ({
    screen: store.screen
  })
)(AppRoot);
