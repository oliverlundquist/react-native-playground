import React, { Component } from 'react'
import { TabBarIOS, View } from 'react-native'
import { connect } from 'react-redux'
import { Dashboard, Orders, Products, Settings } from './'
import NavigationBar from 'react-native-navbar'
import Icon from 'react-native-vector-icons/MaterialIcons'

class Main extends Component {
    state = {
        selectedTab: 'Dashboard'
    };

    render() {
        return (
            <View style={{ flex: 1 }}>
                <NavigationBar
                    tintColor="#303030"
                    title={{ title: this.state.selectedTab, tintColor: "#FFFFFF" }}
                    statusBar={{ style: "light-content" }}
                />
                <TabBarIOS tintColor="#FFFFFF" barTintColor="#303030">
                    <Icon.TabBarItemIOS
                        iconName="assessment"
                        title="Dashboard"
                        selected={this.state.selectedTab === 'Dashboard'}
                        onPress={() => { this.setState({ selectedTab: 'Dashboard' }); }}>
                        <Dashboard />
                    </Icon.TabBarItemIOS>
                    <Icon.TabBarItemIOS
                        iconName="local-mall"
                        title="Orders"
                        selected={this.state.selectedTab === 'Orders'}
                        onPress={() => { this.setState({ selectedTab: 'Orders' }); }}>
                        <Orders />
                    </Icon.TabBarItemIOS>
                    <Icon.TabBarItemIOS
                        iconName="photo"
                        title="Products"
                        selected={this.state.selectedTab === 'Products'}
                        onPress={() => { this.setState({ selectedTab: 'Products' }); }}>
                        <Products />
                    </Icon.TabBarItemIOS>
                    <Icon.TabBarItemIOS
                        iconName="settings"
                        title="Settings"
                        selected={this.state.selectedTab === 'Settings'}
                        onPress={() => { this.setState({ selectedTab: 'Settings' }); }}>
                        <Settings />
                    </Icon.TabBarItemIOS>
                </TabBarIOS>
            </View>
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
