import React, {
  StyleSheet,
  Component,
  View,
  Text,
  TouchableWithoutFeedback
} from 'react-native';
import { connect } from 'react-redux';

import {screenActions} from '../actions';

class StartupScreen extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        setTimeout(()=>this._handlePress(), 1000);
    }
    _handlePress() {
        this.props.dispatch(screenActions.change('home'));
    }
    render() {
        return (
            <TouchableWithoutFeedback onPress={()=>{this._handlePress()}}>
                <View style={styles.container}>
                    <Text>蒋勋说：西洋美学史</Text>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default connect()(StartupScreen);
