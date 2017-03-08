import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, AsyncStorage } from 'react-native'
import { connect } from 'react-redux'
import * as Actions from '../actions'

class ReduxDashboard extends Component {
    componentDidMount() {
        (async function () {
            try {
                await AsyncStorage.setItem('@MySuperStore:key', 'I like to save it.');
            } catch (error) {
                console.log('error');
            }
            try {
                const value = await AsyncStorage.getItem('@MySuperStore:key');
                if (value !== null){
                    console.log(value);
                }
            } catch (error) {
                console.log('error');
            }
        })();
    }

    render() {
        return (
            <View style={styles.container}>
                <View>
                    <TouchableOpacity onPress={ () => this.props.increment(2) } >
                        <Text>Counter: {this.props.count}</Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.welcome}>
                    Welcome to React Native!
                </Text>
                <Text style={styles.instructions}>
                    To get started, edit index.ios.js
                </Text>
                <Text style={styles.instructions}>
                    Press Cmd+R to reload,{'\n'}
                    Cmd+D or shake for dev menu
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
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});

export default connect(
    state => ({
        count: state.counter.count
    }),
    dispatch => ({
        increment: count => dispatch(Actions.increment(count))
    })
)(ReduxDashboard)
