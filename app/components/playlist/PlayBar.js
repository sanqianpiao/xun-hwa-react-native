'use strict';

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableWithoutFeedback,
    ProgressViewIOS,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import Sound from 'react-native-sound';
import FileDownload from 'react-native-file-download';
import RNFS from 'react-native-fs';
import Q from 'q';

class PlayBar extends Component {
    constructor(props){
        super(props);
        this.state = {
            isPlaying: false,
            progress: 0
        }
        this._initSound();
    }
    componentWillReceiveProps(nextProps) {
        if(this.props.playing !== nextProps.playing) {
            // 需要延迟片刻等待新 props 数据生效
            setTimeout(()=>this._initSound().then(()=>this._togglePlay()), 10);
        }
    }
    _downloadSound() {
        let d = Q.defer();

        const dest = RNFS.MainBundlePath
        const headers = {
          'Accept-Language': 'en-US'
        }
        const {url, title} = this.props.playing;
        const fileName = title + '.mp3';
        RNFS.exists(`${dest}/${fileName}`).then((exists)=>{
            // console.log(`${dest}/${fileName}  ${exists}`);
            if(!exists) {
                FileDownload.download(url, dest, fileName, headers)
                .then((response) => {
                    // console.log(`downloaded! file saved to: ${response}`)
                    d.resolve({fileName: fileName, dest: dest});
                })
                .catch((error) => {
                    console.log(error)
                    d.reject(error);
                })
            } else {
                d.resolve({fileName: fileName, dest: dest});
            }
        });

        return d.promise;
    }
    _initSound() {
        let d = Q.defer();
        if(!!this.state.sound) {
            this.state.sound.release();
        }
        const {url} = this.props.playing;
        this._downloadSound(url).then(({fileName, dest}={}) => {
            const sound = new Sound(fileName, dest, (error)=>{
                if(!!error) {
                    console.error('failed to load the sound', error)
                } else {
                    this.setState({
                        sound: sound,
                        isPlaying: false,
                        progress: 0,
                    })
                    d.resolve(sound);
                }
            });
        })
        return d.promise;
    }
    _togglePlay() {
        if(!this.state.isPlaying) {
            const {id} = this.props.playing;
            this.state.sound.play();
            this.state.interval = setInterval(() => this.state.sound.getCurrentTime((currentTime, isPlaying) => {
                    let duration = this.state.sound.getDuration();
                    this.setState({
                        duration: duration,
                        currentTime: currentTime,
                        progress: currentTime / duration
                    })
                }), 1000);
        } else {
            this.state.sound.pause();
            clearInterval(this.state.interval);
        }
        this.setState({
            isPlaying: !this.state.isPlaying
        })
    }
    render() {
        const {title} = this.props.playing;
        let icon;

        if(!this.state.isPlaying) {
            icon = <Icon name="play-circle" size={30} color="red" />;
        } else {
            icon = <Icon name="pause-circle" size={30} color="red" />;
        }
        return (
            <View style={styles.playbar}>
                <View style={styles.rowa}>
                    <View style={styles.cola}>
                        <Text>{title}</Text>
                    </View>
                    <View style={styles.colb}>
                        <TouchableWithoutFeedback onPress={()=>this._togglePlay()}>
                            {icon}
                        </TouchableWithoutFeedback>
                    </View>
                </View>
                <ProgressViewIOS style={styles.progress} progress={this.state.progress} />
            </View>
        );
    }
}

var styles = StyleSheet.create({
    playbar: {
        backgroundColor: '#eeeeee',
        height: 50,
    },
    rowa: {
        flexDirection: 'row',
        height: 47,
    },
    progress: {
        height: 3,
    },
    cola: {
        flex: 0.8,
        alignItems: 'center',
        justifyContent: 'center'
    },
    colb: {
        flex: 0.2,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default PlayBar;
