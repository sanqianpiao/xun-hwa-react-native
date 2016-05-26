'use strict';

import React, { Component } from 'react';
import {
    StyleSheet,
    ListView,
    Text,
    View,
    TouchableHighlight,
} from 'react-native';
import { connect } from 'react-redux';
import { favourite, play } from '../../actions/playlistActions';
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
        let dataSource = this.ds.cloneWithRows(playlist.list);
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
            dataSource: ds.cloneWithRows(playlist.list),
        };
    }
    _handleItemPress(item) {
        this.props.dispatch(play(item));
    }
    _renderRow(item) {
        return (
            <View style={styles.row}>
                <View style={styles.cola}>
                    <Heart favourite={item.status.favourite} id={item.id} handlePress={this._handleHeartPress.bind(this)}/>
                </View>
                <View style={styles.colb}>
                    <TouchableHighlight onPress={()=>this._handleItemPress(item)} underlayColor="#dddddd">
                        <Text>{item.title}</Text>
                    </TouchableHighlight>
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
    }

});

export default connect(store => ({
    playlist: store.playlist
  }))(Playlist);
