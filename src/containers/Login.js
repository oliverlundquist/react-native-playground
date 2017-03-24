import React, { Component } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput } from 'react-native'
import { connect } from 'react-redux'
import * as Auth from '../actions/AuthRequestActions'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {shopname: '', username: '', password: ''};
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.wrapper}>
                    <Image
                        source={require('../../assets/mystore-logo.png')}
                        resizeMode="contain"
                        backgroundColor="#fff"
                    />
                    <TextInput
                        autoCapitalize="none"
                        placeholder="Shopname"
                        autoCorrect={false}
                        autoFocus={true}
                        onChangeText={(shopname) => this.setState({shopname})}
                        style={styles.singleLine}
                    />
                    <TextInput
                        autoCapitalize="none"
                        placeholder="Email"
                        autoCorrect={false}
                        onChangeText={(username) => this.setState({username})}
                        style={styles.singleLine}
                    />
                    <TextInput
                        autoCapitalize="none"
                        placeholder="Password"
                        autoCorrect={false}
                        secureTextEntry={true}
                        onChangeText={(password) => this.setState({password})}
                        style={styles.singleLine}
                    />
                    <TouchableOpacity onPress={ () => this.props.login(this.state) } >
                        <Text>Login!</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#F5FCFF',
    },
    wrapper: {
        // flex: 1,
        // justifyContent: 'center',
        // padding: 50,
        // borderWidth: 1,
        // borderColor: 'gray',
        backgroundColor: 'blue',
        marginVertical: 200,
        marginHorizontal: 50
    },
    innerWrapper: {
        // padding: 50
    },
    singleLine: {
        backgroundColor: 'yellow',
        fontSize: 16,
        padding: 4,
        borderColor: 'gray',
        borderWidth: 1,
        height: 40
    },
    button: {
        backgroundColor: 'pink',
        padding: 4,
        borderColor: 'gray',
        borderWidth: 1,
    }
});

export default connect(
    state => ({
        access_token: state.storage.access_token,
        refresh_token: state.storage.refresh_token
    }),
    dispatch => ({
        login: state => dispatch(Auth.issueToken(state.shopname, state.username, state.password))
        // login: async state => dispatch(Client.issueToken(state.shopname, state.username, state.password))
    })
)(Login)
