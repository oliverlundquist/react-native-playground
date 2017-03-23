import React, { Component } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, Text, View } from 'react-native'

class Orders extends Component {
    render () {
        return (
            <View style={[styles.tabContent, {backgroundColor: '#ccc'}]}>
                <Text style={styles.tabText}>Orders!</Text>
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
        //
    })
)(Orders)
