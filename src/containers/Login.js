import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, AsyncStorage } from 'react-native'
import { connect } from 'react-redux'
import * as Actions from '../actions'

class Login extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>
                    Login Screen
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    }
});

export default connect(
    state => ({
        count: state.counter.count
    }),
    dispatch => ({
        increment: count => dispatch(Actions.increment(count))
    })
)(ReduxDashboard)
