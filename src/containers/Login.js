import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native'
import { connect } from 'react-redux'
import { login } from '../actions/LoginActions'
import * as Request from '../actions/RequestActions'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {text: '', pass: ''};
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.wrapper}>
                    <TextInput
                        autoCapitalize="none"
                        placeholder="Email"
                        autoCorrect={false}
                        autoFocus={true}
                        onChangeText={(text) => this.setState({text})}
                        style={styles.singleLine}
                    />
                    <TextInput
                        autoCapitalize="none"
                        placeholder="Password"
                        autoCorrect={false}
                        secureTextEntry={true}
                        onChangeText={(pass) => this.setState({pass})}
                        style={styles.singleLine}
                    />
                    <TouchableOpacity style={styles.button} onPress={ () => this.props.loginAction() } >
                        <Text>Login! {this.state.text} {this.state.pass}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={ () => this.props.fetchAction('languages') } >
                        <Text>Go fetch something!</Text>
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
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'blue',
        marginVertical: 200,
        marginHorizontal: 50
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
        login: state.login,
        config: state.config
    }),
    dispatch => ({
        loginAction: someparam => dispatch(login(someparam)),
        fetchAction: someparam => dispatch(Request.get(someparam))
    })
)(Login)
