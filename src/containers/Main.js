import React, { Component } from 'react'
import { TabBarIOS, NavigatorIOS, StatusBar } from 'react-native'
import { connect } from 'react-redux'
import { Dashboard, Orders, Products, Settings } from './'
import Icon from 'react-native-vector-icons/MaterialIcons'

class Main extends Component {
    state = {
        selectedTab: 'Dashboard'
    };

    componentDidMount() {
        StatusBar.setBarStyle('light-content');
    }

    _renderComponent(component, title) {
        return (
            <NavigatorIOS
                initialRoute={{ component: component, title: title }}
                barTintColor="#303030"
                tintColor="#FFFFFF"
                titleTextColor="#FFFFFF"
                style={{flex: 1}}
                itemWrapperStyle={{paddingTop: 64}}
            />
        );
    }

    render() {
        return (
            <TabBarIOS tintColor="#FFFFFF" barTintColor="#303030">
                <Icon.TabBarItemIOS
                    iconName="assessment"
                    title="Dashboard"
                    selected={this.state.selectedTab === 'Dashboard'}
                    onPress={() => { this.setState({ selectedTab: 'Dashboard' }); }}>
                    { this._renderComponent(Dashboard, 'Dashboard') }
                </Icon.TabBarItemIOS>
                <Icon.TabBarItemIOS
                    iconName="local-mall"
                    title="Orders"
                    selected={this.state.selectedTab === 'Orders'}
                    onPress={() => { this.setState({ selectedTab: 'Orders' }); }}>
                    { this._renderComponent(Orders, 'Orders') }
                </Icon.TabBarItemIOS>
                <Icon.TabBarItemIOS
                    iconName="photo"
                    title="Products"
                    selected={this.state.selectedTab === 'Products'}
                    onPress={() => { this.setState({ selectedTab: 'Products' }); }}>
                    { this._renderComponent(Products, 'Products') }
                </Icon.TabBarItemIOS>
                <Icon.TabBarItemIOS
                    iconName="settings"
                    title="Settings"
                    selected={this.state.selectedTab === 'Settings'}
                    onPress={() => { this.setState({ selectedTab: 'Settings' }); }}>
                    { this._renderComponent(Settings, 'Settings') }
                </Icon.TabBarItemIOS>
            </TabBarIOS>
        );
    }
}

export default connect(
    state => ({
        //
    }),
    dispatch => ({
        //
    })
)(Main)
