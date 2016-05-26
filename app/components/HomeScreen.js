'use strict';

import React, { Component } from 'react';
import {
    StyleSheet,
    ListView,
    Text,
    View,
} from 'react-native';
import { connect } from 'react-redux';
import { played } from '../actions/playlistActions';
import Playlist from './playlist/Playlist';
import PlayBar from './playlist/PlayBar';

class HomeScreen extends Component {
    constructor(props){
        super(props);
    }
    _handlePlayed(id) {
        this.props.dispatch(played(id))
    }
    render() {
        const { playing } = this.props.playlist;
        return (
            <View style={styles.container}>
                <Playlist />
                <PlayBar playing={playing} handlePlayed={(id)=>this._handlePlayed(id)} />
            </View>
      );
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    playlist: {
        padding: 20,
    }
});

export default connect(store => ({
    playlist: store.playlist
  }))(HomeScreen);
