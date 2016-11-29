'use strict';

import React, { Component } from 'react';
import {
    StyleSheet,
    ListView,
    Text,
    View,
} from 'react-native';
import { connect } from 'react-redux';

class StoryScreen extends Component {
    constructor(props){
        super(props);
    }
    render() {
        const {story} = this.props.screen;
        return (
            <View style={styles.container}>
                <View></View>
            </View>
      );
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default connect(store => ({
    screen: store.screen
  }))(StoryScreen);
