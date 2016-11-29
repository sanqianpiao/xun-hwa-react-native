'use strict';

import React, { Component } from 'react';
import {
    StyleSheet,
    ListView,
    Text,
    View,
    TouchableWithoutFeedback,
} from 'react-native';
import { connect } from 'react-redux';
import { favourite, play } from '../../actions/playlistActions';
import { goGallery } from '../../actions/screenActions';
import Heart from './Heart';

class Playlist extends Component {
    constructor(props){
        super(props);
        this._initDataSource();
    }
    componentWillReceiveProps(nextProps) {
        if(this.props.playlist !== nextProps.playlist) {
            this._initDataSource();
        }
    }
    _initDataSource() {
        const {playlist} = this.props;
        if(!this.ds) {
            this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        }
        let dataSource = this.ds.cloneWithRows(playlist.stories);
        if(!this.state) {
            this.state = {
                dataSource: dataSource
            };
        } else {
            this.setState({
                dataSource: dataSource
            })
        }
    }
    _handleHeartPress(id) {
        this.props.dispatch(favourite(id));

        const {playlist} = this.props;
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(playlist.stories),
        };
    }
    _handleItemPress(story) {
        this.props.dispatch(play(story));
    }
    _handleItemLongPress(story) {
        this.props.dispatch(goGallery(story));
    }
    _renderRow(story) {
        const titleStyle = story.status.played ? styles.playedTitle : styles.unplayedTitle;
        return (
            <View style={styles.row}>
                <View style={styles.cola}>
                    <Heart favourite={story.status.favourite} id={story.id} handlePress={this._handleHeartPress.bind(this)}/>
                </View>
                <View style={styles.colb}>
                    <TouchableWithoutFeedback onPress={()=>this._handleItemPress(story)} onLongPress={()=>this._handleItemLongPress(story)}>
                        <Text style={titleStyle}>{story.title}</Text>
                    </TouchableWithoutFeedback>
                </View>
            </View>
        )
    }
    render() {
        return (
            <ListView
                style = {styles.playlist}
                dataSource={this.state.dataSource}
                renderRow={this._renderRow.bind(this)}
            />
        );
    }
}

var styles = StyleSheet.create({
    playlist: {
        padding: 20,
    },
    row: {
        height: 40,
        flex: 1,
        flexDirection: 'row',
        marginBottom: 3,
    },
    cola: {
        flex: .2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    colb: {
        flex: .8,
        justifyContent: 'center',
    },
    playedTitle: {
        color: '#402a1d'
    },
    unplayedTitle: {
        color: '#8c6e49'
    }

});

export default connect(store => ({
    playlist: store.playlist
  }))(Playlist);
