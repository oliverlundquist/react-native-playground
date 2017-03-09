import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native'
import { connect } from 'react-redux'
import { login } from '../actions/LoginActions'

class Login extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.wrapper}>
                    <TextInput
                        autoCapitalize="none"
                        placeholder="Enter text to see events"
                        autoCorrect={false}
                        style={styles.singleLine}
                    />
                    <TouchableOpacity style={styles.button} onPress={ () => this.props.loginAction() } >
                        <Text>L</Text>
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
        justifyContent: 'flex-start',
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
        height: 20,
        width: 20
    },
    button: {
        backgroundColor: 'pink',
        padding: 4,
        borderColor: 'gray',
        borderWidth: 1,
        height: 20,
        width: 20
    }
});

export default connect(
    state => ({
        login: state.login
    }),
    dispatch => ({
        loginAction: someparam => dispatch(login(someparam))
    })
)(Login)
