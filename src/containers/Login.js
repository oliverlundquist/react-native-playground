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
                        source={require('../../assets/mystore-logo@2x.png')}
                        resizeMode="contain"
                        style={styles.logo}
                    />
                    <Text style={styles.inputHeader}>Shopname</Text>
                    <TextInput
                        autoCapitalize="none"
                        autoCorrect={false}
                        autoFocus={true}
                        onChangeText={(shopname) => this.setState({shopname})}
                        style={styles.singleLine}
                    />
                    <Text style={styles.inputHeader}>Email</Text>
                    <TextInput
                        autoCapitalize="none"
                        autoCorrect={false}
                        onChangeText={(username) => this.setState({username})}
                        style={styles.singleLine}
                    />
                    <Text style={styles.inputHeader}>Password</Text>
                    <TextInput
                        autoCapitalize="none"
                        autoCorrect={false}
                        secureTextEntry={true}
                        onChangeText={(password) => this.setState({password})}
                        style={styles.singleLine}
                    />
                    <TouchableOpacity
                        onPress={ () => this.props.login(this.state) }
                        style={styles.button}>
                        <Text style={styles.buttonText}>Login</Text>
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
    },
    wrapper: {
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#C5C5C5',
        borderRadius: 10,
        shadowColor: '#C5C5C5',
        shadowOffset: { width: 7, height: 7 },
        shadowOpacity: 0.5,
        shadowRadius: -1,
        marginVertical: 105,
        marginRight: 25,
        marginLeft: 30,
        paddingVertical: 30,
        paddingHorizontal: 50
    },
    logo: {
        marginBottom: 15
    },
    inputHeader: {
        marginBottom: 5,
        fontSize: 16,
        color: '#dddddd'
    },
    singleLine: {
        fontSize: 16,
        padding: 4,
        borderColor: '#C5C5C5',
        borderWidth: 1,
        height: 40,
        marginBottom: 15
    },
    button: {
        backgroundColor: '#82B840',
        marginTop: 15,
        padding: 15,
        borderRadius: 10,
        width: 150,
        alignItems: 'center'
    },
    buttonText: {
        color: '#FFFFFF',
        fontWeight: 'bold'
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
