import React, { Component } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import * as Storage from '../actions/AsyncStorageActions'

class Settings extends Component {
    render () {
        return (
            <View style={[styles.tabContent, {backgroundColor: '#ccc'}]}>
                <Text style={styles.tabText}>Settings!</Text>
                <TouchableOpacity onPress={ () => this.props.reset() } >
                    <Text>Reset Tokens</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    tabContent: {
        flex: 1,
        alignItems: 'center',
    },
    tabText: {
        color: 'white',
        margin: 50,
    },
});

export default connect(
    state => ({
        //
    }),
    dispatch => ({
        reset: () => dispatch(Storage.remove(['access_token', 'refresh_token', 'shopname', 'username', 'password']))
    })
)(Settings)
