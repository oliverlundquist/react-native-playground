/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux'
import { Root } from './src/containers'
import { configureStore } from './src/store'

const store = configureStore()

export default class ReduxDashboard extends Component {
    render() {
        return (
            <Provider store={store}>
                <Root />
            </Provider>
        )
    }
}

AppRegistry.registerComponent('ReduxDashboard', () => ReduxDashboard);
