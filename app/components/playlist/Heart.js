'use strict';

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableWithoutFeedback,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

class Heart extends Component {
    constructor(props){
        super(props);
    }
    render() {
        const {id, favourite, handlePress} = this.props;
        let icon;
        if(favourite) {
            icon = <Icon name="heart" size={20} color="red" />
        } else {
            icon = <Icon name="heart-o" size={20} color="gray" />
        }
        return (
            <View>
                <TouchableWithoutFeedback onPress={()=>{handlePress(id)}}>
                    {icon}
                </TouchableWithoutFeedback>
            </View>
        );
    }
}

var styles = StyleSheet.create({

});

export default Heart;
