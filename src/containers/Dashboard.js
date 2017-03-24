import React, { Component } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, Text, View, Image } from 'react-native'

class Dashboard extends Component {
    render () {
        return (
            <View style={styles.tabContent}>
                <Text style={{ marginTop: 20, marginBottom: 10, marginHorizontal: 50, color: 'white' }}>Dashboard!</Text>
                <Text style={{ marginTop: 5, marginBottom: 10, marginHorizontal: 50, color: 'white' }}>Put some cool real-time graphs here that show sales data and sales data history</Text>
                <Image
                    source={require('../../assets/square-dashboard.png')}
                    style={{ marginHorizontal: 50, flex: 0.8 }}
                    resizeMode="contain"
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    tabContent: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#ccc'
    },
    tabText: {
        color: 'white',
        margin: 20,
    },
});

export default connect(
    state => ({
        //
    }),
    dispatch => ({
        //
    })
)(Dashboard)
