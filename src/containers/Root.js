import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { configureStore } from '../store'
import { default as Dashboard } from './Dashboard'

const store = configureStore()

export default class Root extends Component {
    render () {
        return (
            <Provider store={store}>
                <Dashboard />
            </Provider>
        )
    }
}



render () {
    if (this.state.loggedIn) {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    You are authenticated!
                </Text>
                <Button style={{color: 'black'}} onPress={this.logout.bind(this)}>Logout</Button>
            </View>
        );
    }
    else {
        return (
            <ReactNativeLogin/>
        );
    }
